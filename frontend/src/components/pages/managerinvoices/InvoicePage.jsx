import React, { useState } from "react";
import SidebarManager from "../../layout/SidebarManager";
import Header from "../../layout/Header";
import FilterInvoices from "./component/FilterInvoices";
import InvoicesTable from "./component/InvoicesTable";
import "./InvoicePage.css";
const InvoicePage = () => {
    const [itemsPerPage, setItemsPerPage ] = useState(10);
    const totalInvoices = 100;
  return (
    <div className="home-manager-container">
      {/* Sidebar cố định */}
      <SidebarManager />

      {/* Header trải dài từ cột 2 đến 3 */}
      <div className="head-manager-container">
        <Header />     
      </div>

      {/* Nội dung chính */}
      <div className="body-manager-container">
        <h1 style={{fontSize: "22px", padding: "0 20px"}}>Danh sách hóa đơn</h1>
        <FilterInvoices />
        <div className="invoice-controls">
          <div>
            <label htmlFor="itemsPerPage">Số hóa đơn hiển thị:</label>
            <select 
                id="itemsPerPage" 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
          </div>
          <span>Tổng số hóa đơn: {totalInvoices}</span>
        </div>
        <InvoicesTable />
      </div>

      {/* Khu vực đặt hàng */}
    </div>
  );
};

export default InvoicePage;
