import React, { useState } from "react";
import InvoicesDetail from "./InvoicesDetail";
import "../styles/InvoicesTable.css";
const InvoicesTable = () => {
  const invoicesList = [
    { id: 1, invoice_name: "Invoice 1", amount: "5,000,000 ₫", date: "2025-03-27", table: "Bàn 5" },
    { id: 2, invoice_name: "Invoice 2", amount: "10,000,000 ₫", date: "2025-03-26", table: "Bàn 3" },
    { id: 3, invoice_name: "Invoice 3", amount: "8,500,000 ₫", date: "2025-03-25", table: "Bàn 2" },
    { id: 4, invoice_name: "Invoice 4", amount: "7,200,000 ₫", date: "2025-03-24", table: "Bàn 6" },
    { id: 5, invoice_name: "Invoice 5", amount: "6,000,000 ₫", date: "2025-03-23", table: "Bàn 1" },
  ];

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleOpenModal = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="invoices-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hóa đơn</th>
            <th>Số Tiền</th>
            <th>Ngày</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {invoicesList.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoice_name}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.date}</td>
              <td style={{ textAlign: "center" }}>
                <button className="view-btn" onClick={() => handleOpenModal(invoice)}>Xem</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal hiển thị chi tiết hóa đơn */}
      {selectedInvoice && (
        <div className="modal-invoice-overlay">
          <div className="modal-invoice-content">
            <div className="modal-invoice-header">
                <h2>Hóa đơn {selectedInvoice.id}</h2>
                <p>Bàn: {selectedInvoice.table}</p>
            </div>
            <InvoicesDetail invoice={selectedInvoice} />
            <button className="close-btn" onClick={handleCloseModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default InvoicesTable;