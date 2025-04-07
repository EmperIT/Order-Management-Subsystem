import React from "react";
import "../styles/OrderItem.css";
import OrderNote from "./OrderNote";

const OrderItem = ({ item, onIncrease, onDecrease, onNoteChange }) => {
  return (
    <div className="order-item-container">
      <div className="order-item">
        <img src={item.image} alt={item.name} className="order-item-image" />
        <div className="order-item-details">
          <p className="order-item-name">{item.name}</p>
          <p className="order-item-price">{item.price} đ</p>
        </div>
        <div className="order-item-quantity">
          <button onClick={() => onDecrease(item.id)} className="quantity-btn-remove">-</button>
          <span className="quantity">{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)} className="quantity-btn-add">+</button>
        </div>
      </div>

      {/* Tách OrderNote xuống riêng một dòng */}
      <div className="order-note-container">
        <OrderNote 
          value={item.note}
          onNoteChange={(e) => onNoteChange(item.id, e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderItem;
