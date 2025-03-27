import { useState } from "react";
import React from "react";
import SidebarChef from "../../layout/SidebarChef";
import Header from "../../layout/Header";
import MenuGridChef from "./component/MenuGridChef";
import CategoryFood from "../home/component/CategoryFood";
import steakImage from "../../../assets/images/Bo/2865-loi-vai-wagyu.jpg";
import "./ChefHomePage.css";

const ChefHomePage = () => {
  const menuItems = [
    { id: 1, image: steakImage, name: "Core Steak 200g", price: "250.000" },
    { id: 2, image: steakImage, name: "Pizza Margherita", price: "180.000" },
    { id: 3, image: steakImage, name: "Sushi Combo", price: "320.000" },
    { id: 4, image: steakImage, name: "Classic Burger", price: "150.000" },
    { id: 5, image: steakImage, name: "Spaghetti Carbonara", price: "200.000" },
    { id: 6, image: steakImage, name: "Shoyu Ramen", price: "170.000" },
    { id: 7, image: steakImage, name: "Caesar Salad", price: "120.000" },
    { id: 8, image: steakImage, name: "Tacos Al Pastor", price: "190.000" },
    { id: 9, image: steakImage, name: "Chicken Sandwich", price: "140.000" },
    { id: 10, image: steakImage, name: "Cappuccino", price: "80.000" },
    { id: 11, image: steakImage, name: "Fresh Orange Juice", price: "90.000" },
    { id: 12, image: steakImage, name: "Vanilla Ice Cream", price: "110.000" },
    { id: 13, image: steakImage, name: "Miso Soup", price: "100.000" },
    { id: 14, image: steakImage, name: "T-Bone Steak", price: "350.000" },
    { id: 15, image: steakImage, name: "Pepperoni Pizza", price: "210.000" },
    { id: 16, image: steakImage, name: "Salmon Nigiri", price: "290.000" },
    { id: 17, image: steakImage, name: "Lasagna", price: "230.000" },
    { id: 18, image: steakImage, name: "Cheeseburger", price: "160.000" },
    { id: 19, image: steakImage, name: "Ribeye Steak 300g", price: "400.000" },
    { id: 20, image: steakImage, name: "Tonkotsu Ramen", price: "180.000" },
  ];
  const [orders, setOrders] = useState([]);

  const toggleOrder = (item) => {
    setOrders((prevOrders) => {
      const exists = prevOrders.some((order) => order.id === item.id);
      return exists
        ? prevOrders.filter((order) => order.id !== item.id) // Nếu tồn tại → Xóa món khỏi danh sách
        : [...prevOrders, item]; // Nếu chưa có → Thêm món vào danh sách
    });
  };
  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
};

  return (
    <div className="home-chef-container">
      {/* Sidebar cố định */}
      <SidebarChef />

      {/* Header trải dài từ cột 2 đến 3 */}
      <div className="head-chef-container">
        <Header />     
         <CategoryFood onSelectCategory={handleCategorySelect} />

      </div>

      {/* Nội dung chính */}
      <div className="body-chef-container">
      <MenuGridChef
          menuItems={menuItems}
          orders={orders}
          toggleOrder={toggleOrder}
        />
      </div>

      {/* Khu vực đặt hàng */}
    </div>
  );
};

export default ChefHomePage;
