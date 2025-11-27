import { ShieldCheck, Sparkles, Users, Utensils } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Safe & Secure',
        description: 'Your safety is our priority. We adhere to the highest international safety standards.',
    },
    {
        icon: Sparkles,
        title: 'Premium Experience',
        description: 'Enjoy 5-star amenities, luxury cabins, and world-class service throughout your journey.',
    },
    {
        icon: Utensils,
        title: 'Gourmet Dining',
        description: 'Savor authentic Egyptian cuisine and international dishes prepared by top chefs.',
    },
    {
        icon: Users,
        title: 'Expert Guides',
        description: 'Explore ancient temples with our knowledgeable Egyptologists who bring history to life.',
    },
];

export function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Choose iCruiseEgypt?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We go above and beyond to ensure your Nile cruise is nothing short of extraordinary.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-900">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
