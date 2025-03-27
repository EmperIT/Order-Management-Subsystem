import React from "react";
import "../styles/OrderItem.css";

const OrderItem = ({ item, onIncrease, onDecrease }) => {
  return (
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
  );
};

export default OrderItem;
