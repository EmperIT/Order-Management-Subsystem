import { Schema } from 'mongoose';

export const TableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['available', 'occupied'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);