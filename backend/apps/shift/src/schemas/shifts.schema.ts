import { Schema } from 'mongoose';

export const ShiftSchema = new Schema(
    {
      shiftName: { 
        type: String, 
        required: true 
      },
      startTime: { 
        type: Date, 
        required: true 
      },
      endTime: { 
        type: Date, 
        required: true 
      },
      secretKey: { 
        type: String, 
        required: true,
        unique: true 
      },
      isActive: { 
        type: Boolean, 
        default: true
      },
      totalRevenue: { 
        type: Number, 
        default: 0 
      },
      orderCount: { 
        type: Number, 
        default: 0 
      }
    },
    { timestamps: true }
);
