import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TableList.css";
import Header from "../../layout/Header";
import tableOff from "../../../assets/icons/table_off.png";
import tableOn from "../../../assets/icons/table_on.png";
import { getAllTables } from "../../../services/orderServices";
import { updateTable } from "../../../services/orderServices";
import { createOrder } from "../../../services/orderServices";
const TableList = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getAllTables();    
        console.log("Danh sách bàn từ API:", data); // Kiểm tra dữ liệu API trả về
        setTables(data.tables); // Cập nhật để lấy dữ liệu từ API đúng format
      } catch (err) {
        setError("Không thể tải danh sách bàn. Vui lòng thử lại!");
      }
    };
    fetchTables();
  }, []);


  const handleTableClick = (id, status) => {
    if (status !== "available") {
      alert("Bàn này đã có người, vui lòng chọn bàn khác!");
      return;
    }
    console.log("Bàn được chọn:", id); // Kiểm tra xem ID có đúng không
    setSelectedTable(selectedTable === id ? null : id);
  };

  const handleOpenModal = () => {
    if (selectedTable) {
      setIsModalOpen(true);
    } else {
      alert("Vui lòng chọn một bàn!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCode(""); // Reset input khi đóng modal
  };

  
  const handleSubmit = async () => {
    if (!selectedTable) {
      alert("Vui lòng chọn một bàn!");
      return;
    }
  
    const table = tables.find((t) => t.id === selectedTable);
    console.log("🔍 Bàn được chọn:", table); // Kiểm tra bàn có đúng không?
  
    const newOrder = {
      tableName: table ? table.name : "Unknown",
    };
  
    console.log("📤 Dữ liệu gửi đi:", newOrder); // Kiểm tra dữ liệu trước khi gửi
  
    try {
      const response = await createOrder(newOrder);
      console.log("📩 Phản hồi từ API:", response); // Kiểm tra phản hồi từ API
      const updateResponse = await updateTable(selectedTable, { status: "occupied" });
      console.log("🔄 Cập nhật trạng thái bàn:", updateResponse);
      if (updateResponse) {
        setTables((prevTables) =>
          prevTables.map((t) =>
            t.id === selectedTable ? { ...t, status: "occupied" } : t
          )
        );
        localStorage.setItem("orderId", response.id);

        setIsModalOpen(false);
        navigate("/home", { state: { orderId: response.id } });
      } else {
        alert("Không thể tạo order, vui lòng thử lại!");
      }
    } catch (error) {
      alert("Lỗi khi tạo order: " + error.message);
    }
  };
  
  

  return (
    <div className="table-list-container">
      <div className="head-container">
        <Header />
      </div>
      <h2>TABLE LIST</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="table-body">
        <div className="tables">
          {tables.map((table) => (
            <div
              key={table.id}
              className="table-item"
              onClick={() => handleTableClick(table.id, table.status)}
            >
              <img
                src={selectedTable === table.id || table.status === "occupied" ? tableOn : tableOff }
                alt={`Table ${table.name}`}
                className="table-image"
              />
              <span className="table-label">{table.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="table-footer">
        <p>🪑 Table: {selectedTable ? tables.find(t => t.id === selectedTable)?.name : 0}</p>
        <button className="select-button" onClick={handleOpenModal}>
          SELECT AND CONTINUE
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Nhập code để mở bàn</h3>
            <input
              type="text"
              placeholder="Nhập code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="modal-input"
            />
            <button className="modal-submit" onClick={handleSubmit}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableList;
