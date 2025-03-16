import { Schema } from 'mongoose';

export const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    dishId: {
      type: Schema.Types.ObjectId,
      ref: 'Dish',
      required: true,
    },
    dishName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    note: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['in_progress', 'finalized'],
      default: 'in_progress',
    },
  },
  {
    timestamps: true,
  },
);

OrderItemSchema.index({ orderId: 1, dishId: 1 });
