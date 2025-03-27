import React from "react";

const ChefOrderTable = ({ cart, onStatusChange }) => {
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
              <td>
                <button
                    className={`order-status-btn ${item.status === "done" ? "done" : "pending"}`}
                    onClick={() => onStatusChange(item.id)} // Gọi hàm cập nhật
                >
                    {item.status === "done" ? "Đã xong" : "Chưa xong"}
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChefOrderTable;
