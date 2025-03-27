import { useState } from "react";
import React from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import MenuGrid from "./component/MenuGrid";
import OrderSideBar from "./component/OrderSideBar";
import CategoryFood from "./component/CategoryFood";
import steakImage from "../../../assets/images/Bo/2865-loi-vai-wagyu.jpg";
import "./HomePage.css";

const HomePage = () => {
  const menuItems = [
    { id: 1, name: "Core steak 200g", price: 250000, image: steakImage, quantity: 1 },
    { id: 2, name: "Core steak 200g", price: 250000, image: steakImage, quantity: 1 },
    { id: 3, name: "Core steak 200g", price: 250000, image: steakImage, quantity: 1 },
    { id: 4, name: "Core steak 200g", price: 250000, image: steakImage, quantity: 1 },
    { id: 5, name: "Core steak 200g", price: 250000, image: steakImage, quantity: 1 },
    { id: 6, name: "Core steak 200g", price: 250000, image: steakImage, quantity: 1 },
  ];

  const [orders, setOrders] = useState([]);

  const addToOrder = (item) => {
    const existing = orders.find((order) => order.id === item.id);
    if (existing) {
      setOrders(
        orders.map((order) =>
          order.id === item.id ? { ...order, quantity: order.quantity + 1 } : order
        )
      );
    } else {
      setOrders([...orders, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, amount) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.id === id ? { ...order, quantity: order.quantity + amount } : order
        )
        .filter((order) => order.quantity > 0) // Xóa nếu số lượng giảm xuống 0
    );
  };
  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
};

  return (
    <div className="home-container">
      {/* Sidebar cố định */}
      <Sidebar />

      {/* Header trải dài từ cột 2 đến 3 */}
      <div className="head-container">
        <Header />     
         <CategoryFood onSelectCategory={handleCategorySelect} />

      </div>

      {/* Nội dung chính */}
      <div className="body-container">
        <MenuGrid menuItems={menuItems} addToOrder={addToOrder} />
      </div>

      {/* Khu vực đặt hàng */}
      <div className="order-sidebar-container">
        <OrderSideBar 
          orderItems={orders || []} 
          totalPrice={(orders.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1000).toLocaleString()} 
          onIncrease={(id) => updateQuantity(id, 1)}
          onDecrease={(id) => updateQuantity(id, -1)}        />
      </div>
    </div>
  );
};

export default HomePage;
