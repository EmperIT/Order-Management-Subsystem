import { formatDate } from "../../../../utils/formatDate";

const ChefOrderTable = ({ items, isHeader, onStatusChange }) => {
  return (
    <div className="order-table">
      <table>
        {isHeader && (
          <thead>
            <tr>
              <th>Bàn</th>
              <th>Sản phẩm</th>
              <th>Tên Sản phẩm</th>
              <th>Số lượng</th>
              <th>Ghi chú</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
        )}
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.tableName}</td>
                <td>
                  <img src={item.imageUrl} alt={item.dishName} className="order-item-image" />
                </td>
                <td className="order-item-name" style={{ color: "gray" }}>{item.dishName}</td>
                <td>{item.quantity}</td>
                <td>{item.note}</td>
                <td>{formatDate(item.createdAt)}</td> {/* Hiển thị thời gian đã định dạng */}
                <td>
                  <button
                    className={`order-status-btn ${item.status === "done" ? "done" : "pending"}`}
                    onClick={() => onStatusChange?.(item.id)}
                  >
                    {item.status === "done" ? "Đã xong" : "Chưa xong"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có món ăn để hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChefOrderTable;
