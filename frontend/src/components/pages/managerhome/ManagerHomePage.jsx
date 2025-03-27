import React from "react";
import SidebarManager from "../../layout/SidebarManager";
import Header from "../../layout/Header";
import TitleDashboard from "./component/TitleDashboard";
import RevenueBlock from "./component/RevenueBlock";
import InvoiceBlock from "./component/InvoiceBlock";
import RecentInvoices from "./component/RecentInvoices";
import "./ManagerHomePage.css";
const ManagerHomePage = () => {
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
        <TitleDashboard />
        <div className="block-manager-container">
            <RevenueBlock />
            <InvoiceBlock />
        </div>
        <RecentInvoices />
      </div>

      {/* Khu vực đặt hàng */}
    </div>
  );
};

export default ManagerHomePage;
