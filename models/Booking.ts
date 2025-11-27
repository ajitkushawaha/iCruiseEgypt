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
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
