import { Schema } from 'mongoose';

export const OrderSchema = new Schema(
  {
    tableId: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['in_progress', 'paid'],
      default: 'in_progress',
    },
  },
  {
    timestamps: true,
  },
);

OrderSchema.index({ status: 1 });
