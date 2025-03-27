import React from "react";
import "../styles/RecentInvoices.css";

const RecentInvoices = () => {
  const invoicesList = [
    { id: 1, invoice_name: "Invoice 1", amount: "5,000,000 ₫", date: "2025-03-27" },
    { id: 2, invoice_name: "Invoice 2", amount: "10,000,000 ₫", date: "2025-03-26" },
    { id: 3, invoice_name: "Invoice 3", amount: "8,500,000 ₫", date: "2025-03-25" },
    { id: 4, invoice_name: "Invoice 4", amount: "7,200,000 ₫", date: "2025-03-24" },
    { id: 5, invoice_name: "Invoice 5", amount: "6,000,000 ₫", date: "2025-03-23" },
  ];

  return (
    <div className="invoices-table">
      <h3>Hóa Đơn Gần Đây</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hóa đơn</th>
            <th>Số Tiền</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {invoicesList.slice(0, 3).map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoice_name}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentInvoices;
