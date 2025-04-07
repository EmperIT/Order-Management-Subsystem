import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./OrderDetail.css";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import OrderDetailTable from "./component/OrderDetailTable";
import OrderDetailSummary from "./component/OrderDetailSummary";
import { getOrderItems } from "../../../services/orderServices";

const OrderDetail = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const orderId = location.state?.orderId || localStorage.getItem("orderId");
        console.log("🔍 OrderId được sử dụng:", orderId);

        if (!orderId) {
          throw new Error("Không tìm thấy orderId!");
        }

        const orderItemsResponse = await getOrderItems(orderId);

        const items = orderItemsResponse?.items || [];
        if (items.length === 0) {
          console.warn("⚠️ Không có items cho orderId:", orderId);
        }

        // Chỉ giữ lại các thuộc tính cần thiết
        const simplifiedItems = items.map((item) => ({
          id: item.id,
          name: item.dishName,
          price: item.price,
          quantity: item.quantity,
        }));

        setCart(simplifiedItems);
      } catch (err) {
        console.error("❌ Lỗi khi lấy order-items:", err);
        setError("Không thể lấy chi tiết đơn hàng: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [location.state]);

  // Tính tổng tiền và thuế
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = totalAmount * 0.1; // 10% VAT

  // Xử lý loading và error
  if (loading) {
    return (
      <div className="order-container">
        <Sidebar />
        <div className="order-content">
          <Header />
          <h2 className="order-title-page">Chi tiết đơn hàng</h2>
          <div className="order-detail-body">
            <p>Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-container">
        <Sidebar />
        <div className="order-content">
          <Header />
          <h2 className="order-title-page">Chi tiết đơn hàng</h2>
          <div className="order-detail-body">
            <p className="error">{error}</p>
          </div>
        </div>
      </div>
    );
  }

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