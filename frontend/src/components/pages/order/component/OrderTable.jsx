import React from "react";
import "../styles/OrderTable.css";

const OrderTable = ({ cart }) => {
  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Tên Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} className="order-item-image" />
              </td>
              <td className="order-item-name" style={{ color: "gray" }}>{item.name}</td>
              <td className="order-item-price">{item.price.toLocaleString()} đ</td>
              <td>{item.quantity}</td>
              <td className={`order-status ${item.status === "done" ? "done" : "pending"}`}>
                {item.status === "done" ? "Đã xong" : "Chưa xong"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
