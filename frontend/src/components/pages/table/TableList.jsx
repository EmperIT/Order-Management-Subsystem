import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TableList.css";
import Header from "../../layout/Header";
import tableOff from "../../../assets/icons/table_off.png";
import tableOn from "../../../assets/icons/table_on.png";
const tablesData = [
  { id: 1, label: "T1", selected: false },
  { id: 2, label: "T2", selected: false },
  { id: 3, label: "T3", selected: false },
  { id: 4, label: "T4", selected: false },
  { id: 5, label: "T5", selected: false },
  { id: 6, label: "T6", selected: false },
  { id: 7, label: "T7", selected: false },
  { id: 8, label: "T8", selected: false },
  { id: 9, label: "T9", selected: false },
  { id: 10, label: "T10", selected: false },
  { id: 11, label: "T11", selected: false },
  { id: 12, label: "T12", selected: false },
  { id: 13, label: "T13", selected: false },
  { id: 14, label: "T14", selected: false },
  { id: 15, label: "T15", selected: false },
];

const TableList = () => {
  const [tables, setTables] = useState(tablesData);
  const [selectedTables, setSelectedTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleTableClick = (id) => {
    const updatedTables = tables.map((table) =>
      table.id === id ? { ...table, selected: !table.selected } : table
    );

    setTables(updatedTables);

    const selected = updatedTables.filter((table) => table.selected);
    setSelectedTables(selected);
  };
 const handleOpenModal = () => {
    if (selectedTables.length > 0) {
      setIsModalOpen(true);
    } else {
      alert("Vui lòng chọn ít nhất một bàn!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCode(""); // Reset input khi đóng modal
  };

  const handleSubmit = () => {
    if (code.trim()) {
      setIsModalOpen(false);
      navigate("/home"); // Chuyển hướng về trang Home
    } else {
      alert("Vui lòng nhập code!"); // Kiểm tra nếu input trống
    }
  };
  return (
    <div className="table-list-container">
        <div className="head-container">
            <Header/>
        </div>
        <h2>TABLE LIST</h2>
        <div className="table-body">            
            <div className="tables">
            {tables.map((table) => (
              <div
                key={table.id}
                className="table-item"
                onClick={() => handleTableClick(table.id)}
              >
                <img
                  src={table.selected ? tableOn : tableOff}
                  alt={`Table ${table.label}`}
                  className="table-image"
                />
                <span className="table-label">{table.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="table-footer">
            <p>🪑 Table: {selectedTables.length}</p>
            <button className="select-button" onClick={handleOpenModal}>SELECT AND CONTINUE</button>
        </div>
        {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
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
