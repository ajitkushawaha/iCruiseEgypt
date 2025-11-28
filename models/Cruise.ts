import mongoose, { Schema, Document } from 'mongoose';

export interface ICruise extends Document {
    // Legacy fields (kept for backward compatibility)
    name: string;
    route: string;
    description: string;
    
    // Bilingual fields
    nameEn: string;
    nameAr: string;
    routeEn: string;
    routeAr: string;
    descriptionEn: string;
    descriptionAr: string;
    
    // Common fields
    image: string;
    duration: string;
    rating: number;
    price: number;
    itinerary: Array<{
        day: number;
        title: string;
        titleEn?: string;
        titleAr?: string;
        desc: string;
        descEn?: string;
        descAr?: string;
    }>;
    amenities: string[];
    tags: string[];
    // Multimedia fields
    deckPlans?: string[];
    cabinVideos?: string[];
    gallery?: Array<{
        url: string;
        type: 'image' | 'video';
        caption?: string;
        captionEn?: string;
        captionAr?: string;
    }>;
    cabinTypes?: Array<{
        name: string;
        nameEn?: string;
        nameAr?: string;
        description: string;
        descriptionEn?: string;
        descriptionAr?: string;
        images: string[];
        video?: string;
        price: number;
        capacity: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const CruiseSchema: Schema = new Schema(
    {
        // Legacy fields (for backward compatibility)
        name: { type: String },
        route: { type: String },
        description: { type: String },
        
        // Bilingual fields
        nameEn: { type: String, required: true },
        nameAr: { type: String, required: true },
        routeEn: { type: String, required: true },
        routeAr: { type: String, required: true },
        descriptionEn: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        
        // Common fields
        image: { type: String, required: true },
        duration: { type: String, required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        price: { type: Number, required: true },
        itinerary: [
            {
                day: { type: Number, required: true },
                title: { type: String }, // Legacy
                titleEn: { type: String, required: true },
                titleAr: { type: String, required: true },
                desc: { type: String }, // Legacy
                descEn: { type: String, required: true },
                descAr: { type: String, required: true },
            },
        ],
        amenities: [{ type: String }],
        tags: [{ type: String }],
        // Multimedia fields
        deckPlans: [{ type: String }],
        cabinVideos: [{ type: String }],
        gallery: [
            {
                url: { type: String, required: true },
                type: { type: String, enum: ['image', 'video'], required: true },
                caption: { type: String },
                captionEn: { type: String },
                captionAr: { type: String },
            },
        ],
        cabinTypes: [
            {
                name: { type: String, required: true },
                nameEn: { type: String },
                nameAr: { type: String },
                description: { type: String },
                descriptionEn: { type: String },
                descriptionAr: { type: String },
                images: [{ type: String }],
                video: { type: String },
                price: { type: Number, required: true },
                capacity: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Cruise || mongoose.model<ICruise>('Cruise', CruiseSchema);
