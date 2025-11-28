import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    cruiseId: mongoose.Types.ObjectId;
    cruiseName: string;
    name: string;
    email: string;
    phone: string;
    date: Date;
    guests: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    // Payment fields
    confirmationCode?: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
    paymentMethod?: 'card' | 'paypal' | 'bank_transfer' | 'cash';
    totalAmount?: number;
    currency?: string;
    paidAmount?: number;
    // Additional fields
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
    {
        cruiseId: { type: Schema.Types.ObjectId, ref: 'Cruise', required: true },
        cruiseName: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Date, required: true },
        guests: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        },
        confirmationCode: { type: String, unique: true, sparse: true },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending'
        },
        transactionId: { type: String },
        paymentMethod: {
            type: String,
            enum: ['card', 'paypal', 'bank_transfer', 'cash'],
        },
        totalAmount: { type: Number },
        currency: { type: String, default: 'USD' },
        paidAmount: { type: Number },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
