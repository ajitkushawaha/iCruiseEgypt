import mongoose, { Schema, Document } from 'mongoose';

export interface ITransfer extends Document {
    // Bilingual fields
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    
    // Route information
    fromLocationEn: string;
    fromLocationAr: string;
    toLocationEn: string;
    toLocationAr: string;
    
    // Common fields
    type: 'airport' | 'hotel' | 'port' | 'custom';
    vehicleType: 'sedan' | 'van' | 'bus' | 'luxury';
    capacity: number;
    price: number;
    currency: string;
    duration: number; // in minutes
    image?: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TransferSchema: Schema = new Schema(
    {
        nameEn: { type: String, required: true },
        nameAr: { type: String, required: true },
        descriptionEn: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        fromLocationEn: { type: String, required: true },
        fromLocationAr: { type: String, required: true },
        toLocationEn: { type: String, required: true },
        toLocationAr: { type: String, required: true },
        type: {
            type: String,
            enum: ['airport', 'hotel', 'port', 'custom'],
            required: true,
        },
        vehicleType: {
            type: String,
            enum: ['sedan', 'van', 'bus', 'luxury'],
            required: true,
        },
        capacity: { type: Number, required: true },
        price: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        duration: { type: Number, required: true }, // in minutes
        image: { type: String },
        available: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Transfer || mongoose.model<ITransfer>('Transfer', TransferSchema);
