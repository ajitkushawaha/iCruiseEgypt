import mongoose, { Schema, Document } from 'mongoose';

export interface ICommission extends Document {
    partnerId: mongoose.Types.ObjectId;
    bookingId: mongoose.Types.ObjectId;
    cruiseId?: mongoose.Types.ObjectId;
    amount: number;
    commissionRate: number; // percentage
    commissionAmount: number;
    currency: string;
    status: 'pending' | 'approved' | 'paid' | 'cancelled';
    paymentDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommissionSchema: Schema = new Schema(
    {
        partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
        bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
        cruiseId: { type: Schema.Types.ObjectId, ref: 'Cruise' },
        amount: { type: Number, required: true },
        commissionRate: { type: Number, required: true, default: 10 }, // 10% default
        commissionAmount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        status: {
            type: String,
            enum: ['pending', 'approved', 'paid', 'cancelled'],
            default: 'pending',
        },
        paymentDate: { type: Date },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Commission || mongoose.model<ICommission>('Commission', CommissionSchema);
