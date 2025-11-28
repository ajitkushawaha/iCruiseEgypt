import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
    // Bilingual fields
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    
    // Common fields
    images: string[];
    duration: string; // e.g., "3 hours", "Full Day"
    durationHours: number;
    price: number;
    currency: string;
    category: 'historical' | 'adventure' | 'cultural' | 'leisure' | 'photography';
    locationEn: string;
    locationAr: string;
    itinerary: Array<{
        time: string;
        activityEn: string;
        activityAr: string;
    }>;
    includes: string[];
    excludes: string[];
    meetingPointEn: string;
    meetingPointAr: string;
    available: boolean;
    maxParticipants: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

const TourSchema: Schema = new Schema(
    {
        nameEn: { type: String, required: true },
        nameAr: { type: String, required: true },
        descriptionEn: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        images: [{ type: String }],
        duration: { type: String, required: true },
        durationHours: { type: Number, required: true },
        price: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        category: {
            type: String,
            enum: ['historical', 'adventure', 'cultural', 'leisure', 'photography'],
            required: true,
        },
        locationEn: { type: String, required: true },
        locationAr: { type: String, required: true },
        itinerary: [
            {
                time: { type: String, required: true },
                activityEn: { type: String, required: true },
                activityAr: { type: String, required: true },
            },
        ],
        includes: [{ type: String }],
        excludes: [{ type: String }],
        meetingPointEn: { type: String, required: true },
        meetingPointAr: { type: String, required: true },
        available: { type: Boolean, default: true },
        maxParticipants: { type: Number, default: 20 },
        rating: { type: Number, min: 0, max: 5, default: 0 },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);
