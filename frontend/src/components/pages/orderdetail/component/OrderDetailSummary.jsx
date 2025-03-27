import React from "react";
import "../styles/OrderDetailSummary.css";
import paymentlogo from "../../../../assets/icons/payment_logo.png";
const OrderDetailSummary = ({ totalAmount, tax }) => {
  return (
    <div className="order-detail-summary-table">
      <h3>Total</h3>
      <img src={paymentlogo} alt="logo payment" className="payment-logo"></img>
      <p><span>Tổng tiền:</span> {totalAmount.toLocaleString()} đ</p>
      <p><span>Tax:</span> {(tax).toLocaleString()}đ</p>
      <hr />
    <p className="total-amount"><span>Thành tiền:</span> {(totalAmount+tax).toLocaleString()}  đ</p>

      <div className="order-buttons">
        <button className="add-more-btn">Đặt thêm món</button>
        <button className="payment-btn">Thanh toán</button>
      </div>
    </div>
  );
};

export default OrderDetailSummary;
