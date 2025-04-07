import React from "react";
import "../styles/OrderDetailTable.css";

const OrderDetailTable = ({ cart }) => {
  // Gộp các món giống nhau lại
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

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
          {groupedItems.length > 0 ? (
            groupedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name || "Không có tên"}</td>
                <td>{item.price.toLocaleString()} đ</td>
                <td>
                  <span>{item.quantity}</span>
                </td>
                <td>{(item.price * item.quantity).toLocaleString()} đ</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Chưa có món nào trong đơn hàng này.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailTable;
