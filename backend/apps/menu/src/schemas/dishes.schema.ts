import { Schema } from 'mongoose';

export const DishSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  dishType: { type: String, required: true },
  category: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
