import mongoose, { Schema, Document } from 'mongoose';

export interface IHotel extends Document {
    // Bilingual fields
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    locationEn: string;
    locationAr: string;
    
    // Common fields
    images: string[];
    rating: number;
    amenities: string[];
    pricePerNight: number;
    currency: string;
    address: string;
    city: string;
    country: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    starRating: number;
    createdAt: Date;
    updatedAt: Date;
}

const HotelSchema: Schema = new Schema(
    {
        nameEn: { type: String, required: true },
        nameAr: { type: String, required: true },
        descriptionEn: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        locationEn: { type: String, required: true },
        locationAr: { type: String, required: true },
        images: [{ type: String }],
        rating: { type: Number, min: 0, max: 5, default: 0 },
        amenities: [{ type: String }],
        pricePerNight: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true, default: 'Egypt' },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number },
        },
        starRating: { type: Number, min: 1, max: 5, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);
