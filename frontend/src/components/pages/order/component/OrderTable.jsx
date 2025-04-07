import React from "react";
import "../styles/OrderTable.css";

const OrderTable = ({ cart }) => {
  const getStatusText = (status) => {
    switch (status) {
      case "done":
        return "Đã xong";
      case "pending":
      default:
        return "Chưa xong";
    }
  };

  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Tên Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {cart?.length > 0
            ? cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.dishName}
                      className="order-item-image"
                    />
                  </td>
                  <td className="order-item-name" style={{ color: "gray" }}>
                    {item.dishName}
                  </td>
                  <td className="order-item-price">
                    {item.price?.toLocaleString() || "N/A"} đ
                  </td>
                  <td>{item.quantity || 0}</td>
                  <td className="order-item-note">
                    {item.note || ""}
                  </td>
                  <td
                    className={`order-status ${
                      item.status === "done"
                        ? "done"                     
                        : "pending"
                    }`}
                  >
                    {getStatusText(item.status)}
                  </td>
                </tr>
              ))
            : /* Fallback khi không có món */ (
                <tr>
                  <td colSpan="6">Chưa có món nào trong đơn hàng này.</td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;