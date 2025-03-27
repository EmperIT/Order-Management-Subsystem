import React from "react";
import "../styles/OrderSummaryTable.css";

const OrderSummaryTable = ({ totalAmount, tax }) => {
  return (
    <div className="order-summary-table">
      <h3>Total</h3>
      <p><span>Tổng tiền:</span> {totalAmount.toLocaleString()} đ</p>
      <p><span>Tax:</span> {(tax).toLocaleString()}đ</p>
      <hr />
    <p className="total-amount"><span>Thành tiền:</span> {(totalAmount+tax).toLocaleString()}  đ</p>

      <div className="order-buttons">
        <button className="back-btn">Quay lại</button>
        <button className="order-btn">Đặt hàng</button>
      </div>
    </div>
  );
};

export default OrderSummaryTable;
