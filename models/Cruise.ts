import mongoose, { Schema, Document } from 'mongoose';

export interface ICruise extends Document {
    name: string;
    image: string;
    duration: string;
    route: string;
    rating: number;
    price: number;
    description: string;
    itinerary: Array<{
        day: number;
        title: string;
        desc: string;
    }>;
    amenities: string[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const CruiseSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        duration: { type: String, required: true },
        route: { type: String, required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        itinerary: [
            {
                day: { type: Number, required: true },
                title: { type: String, required: true },
                desc: { type: String, required: true },
            },
        ],
        amenities: [{ type: String }],
        tags: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Cruise || mongoose.model<ICruise>('Cruise', CruiseSchema);
