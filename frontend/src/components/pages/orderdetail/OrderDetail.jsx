import React, { useState } from "react";
import "./OrderDetail.css";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import OrderDetailTable from "./component/OrderDetailTable";
import OrderDetailSummary from "./component/OrderDetailSummary";
const OrderDetail = () => {
    // Danh sách sản phẩm mặc định
    const orders = [
        { id: 1, name: "Core steak 200g", price: 250000},
        { id: 2, name: "Core steak 200g", price: 250000},
        { id: 3, name: "Core steak 200g", price: 250000},
        { id: 4, name: "Core steak 200g", price: 250000},
        { id: 5, name: "Core steak 200g", price: 250000},
        { id: 6, name: "Core steak 200g", price: 250000},
        { id: 7, name: "Core steak 200g", price: 250000},
        { id: 8, name: "Core steak 200g", price: 250000},
        { id: 9, name: "Core steak 200g", price: 250000},
    ];
    const [cart] = useState(orders.map((item) => ({ ...item, quantity: 1 })));

    // Quản lý giỏ hàng
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalAmount * 0.1; // 10% VAT
    return (
        <div className="order-container">
            <Sidebar />
            <div className="order-content">
                <Header />
                <h2 className="order-title-page">Chi tiết đơn hàng</h2>
                <div className="order-detail-body">
                    <OrderDetailTable cart={cart} />
                    <OrderDetailSummary totalAmount={totalAmount} tax={tax} />
                </div>

            </div>
        </div>
    );
};

export default OrderDetail;
