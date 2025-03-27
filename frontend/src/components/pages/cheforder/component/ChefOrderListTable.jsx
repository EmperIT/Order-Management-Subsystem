import React, { useState } from "react";
import ChefOrderTable from "./ChefOrderTable";

const ChefOrderListTable = ({ orders, onUpdateOrderStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSelectedOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="order-list-table">
      <table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Đơn hàng</th>
            <th>Bàn</th>
            <th>Số lượng</th>
            <th>Thời gian đặt</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.orderName}</td>
              <td>{order.table_id}</td>
              <td>{order.items.length}</td> {/* Số lượng */}
              <td>{new Date(order.orderTime).toLocaleString()}</td>
              <td>
                <button className="detail-btn" onClick={() => handleSelectedOrder(order)}>
                  Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal hiển thị chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="modal-ordertable-overlay">
          <div className="modal-ordertable-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Chi tiết đơn hàng</h2>
            <div className="order-table-content">
              {/* Truyền `onUpdateOrderStatus` để cập nhật trạng thái */}
              <ChefOrderTable cart={selectedOrder.items} onStatusChange={onUpdateOrderStatus} />
            </div>
            <div className="order-table-note">
              <strong>Ghi chú:</strong> {selectedOrder.note || "Không có ghi chú"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefOrderListTable;
