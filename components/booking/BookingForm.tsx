'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    date: z.date({
        message: 'A date of travel is required',
    }),
    guests: z.string().min(1, 'Please select number of guests'),
});

interface BookingFormProps {
    cruiseId: string;
    cruiseName: string;
    price: number;
}

export function BookingForm({ cruiseId, cruiseName, price }: BookingFormProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: session?.user?.name || '',
            email: session?.user?.email || '',
            phone: '',
        },
    });

    // Update form values when session is available
    useEffect(() => {
        if (session?.user) {
            form.setValue('name', session.user.name || '');
            form.setValue('email', session.user.email || '');
        }
    }, [session, form]);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (status !== 'authenticated') {
            toast.error('Authentication Required', {
                description: 'Please sign in to complete your booking.',
                action: {
                    label: 'Sign In',
                    onClick: () => signIn('google'),
                },
            });
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Starting booking submission...');
            // 1. Create booking in our database
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cruiseId,
                    cruiseName,
                    // @ts-ignore
                    userId: session?.user?.id,
                    ...values,
                    totalAmount: price * parseInt(values.guests),
                }),
            });

            const bookingData = await res.json();

            if (!bookingData.success) {
                throw new Error(bookingData.error || 'Booking failed');
            }

            const bookingId = bookingData.data.id;

            // 2. Create Razorpay Order
            const orderRes = await fetch('/api/payments/razorpay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: price * parseInt(values.guests),
                    bookingId: bookingId,
                    currency: 'INR',
                }),
            });

            const orderData = await orderRes.json();

            if (!orderData.success) {
                throw new Error(orderData.error || 'Payment initialization failed');
            }

            // 3. Open Razorpay Checkout
            const resScript = await loadRazorpay();

            if (!resScript) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'iCruiseEgypt',
                description: `Booking for ${cruiseName}`,
                order_id: orderData.order.id,
                modal: {
                    ondismiss: function() {
                        setIsSubmitting(false);
                    }
                },
                handler: async function (response: any) {
                    // Verify payment
                    const verifyRes = await fetch('/api/payments/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId: bookingId,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        setOpen(false);
                        toast.success('Payment Successful!', {
                            description: `Your booking for ${cruiseName} is confirmed. Confirmation code: ${verifyData.confirmationCode}`,
                        });
                        form.reset();
                        router.push('/my-bookings');
                    } else {
                        toast.error('Payment Verification Failed', {
                            description: verifyData.error || 'Please contact support.',
                        });
                    }
                },
                prefill: {
                    name: values.name,
                    email: values.email,
                    contact: values.phone,
                },
                theme: {
                    color: '#1e3a8a', // Dark blue
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error: any) {
            console.error('Booking/Payment error:', error);
            toast.error('Operation Failed', {
                description: error.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg h-14">
                    Book Now - Starting ${price}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Your Cruise</DialogTitle>
                    <DialogDescription>
                        Request a booking for <span className="font-semibold text-blue-900">{cruiseName}</span>.
                        We will confirm availability and send payment details.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {status !== 'authenticated' && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 mb-4">
                                <p className="font-medium">Sign in required</p>
                                <p>Please sign in with Google to complete your booking and secure your reservation.</p>
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 234 567 890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Travel Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="guests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Guests</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1 Guest</SelectItem>
                                                <SelectItem value="2">2 Guests</SelectItem>
                                                <SelectItem value="3">3 Guests</SelectItem>
                                                <SelectItem value="4">4+ Guests</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {status === 'authenticated' ? (
                            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Confirm & Pay'
                                )}
                            </Button>
                        ) : (
                            <Button 
                                type="button" 
                                onClick={() => signIn('google', { callbackUrl: window.location.href })} 
                                className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 h-11"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Sign in with Google to Book
                            </Button>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
