import React from "react";
import "../styles/OrderSideBar.css"; // Đảm bảo bạn có file CSS này
import OrderItem from "./OrderItem";
import "../styles/OrderSummary.css";
const OrderSideBar = ({ orderItems = [], totalPrice = 0, onPlaceOrder,  onIncrease, onDecrease, onNoteChange  }) => {
  const handlePlaceOrder = () => {
    onPlaceOrder();
  }
  return (
    <div className="right-sidebar">
      <h2 className="order-title">Order</h2>
      {orderItems.length > 0 ? (
        <div className="order-items-list">
          {orderItems.map((item) => (
            <OrderItem 
              key={item.id} 
              item={item} 
              onIncrease={onIncrease} 
              onDecrease={onDecrease} 
              onNoteChange={onNoteChange}

            />
          ))}
        </div>
      ) : (
        <p className="empty-order">Chưa có sản phẩm nào</p>
      )}
        {/* <OrderSummary totalPrice={totalPrice} /> */}
      <div className="total-amount">
        <span>Tổng tiền:</span> {totalPrice.toLocaleString()} đ
      </div>
      <button className="place-order-btn" onClick={handlePlaceOrder}>Đặt hàng</button>
      
    </div>
  );
};

export default OrderSideBar;
