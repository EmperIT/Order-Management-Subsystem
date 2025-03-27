import React from "react";
import "../styles/OrderDetailTable.css";

const OrderDetailTable = ({cart}) => {
  return (
    <div className="order-detail-table">
      <table>
        <thead> 
          <tr>
            <th>Tên Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td >{item.price.toLocaleString()} đ</td>
              <td>
                <span>{item.quantity}</span>
              </td>
              <td >{(item.price * item.quantity).toLocaleString()} đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailTable;
