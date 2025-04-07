import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import MenuGrid from "./component/MenuGrid";
import OrderSideBar from "./component/OrderSideBar";
import CategoryFood from "./component/CategoryFood";
import "./HomePage.css";
import useMenu from "../../../hooks/useMenu";
import { createOrderItem } from "../../../services/orderServices";

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Mặc định: tất cả món ăn
  const [selectedDishType, setSelectedDishType] = useState("all"); // Mặc định: hiển thị tất cả loại món ăn
  const [selectedDish, setSelectedDish] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState([]); // Danh sách món đã lọc theo category

  const location = useLocation();

  // Gọi API lấy danh sách món ăn
  const { menu, loading, error } = useMenu();

  useEffect(() => {
    if (location.state?.orderId) {
      setOrderId(location.state.orderId);
      localStorage.setItem("orderId", location.state.orderId);
    } else {
      const savedOrderId = localStorage.getItem("orderId");
      if (savedOrderId) {
        setOrderId(savedOrderId);
      }
    }
  }, [location.state]);
  console.log("📦 Đơn hàng ID:", orderId);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    if (category) {
      setSelectedDishType(category);
    } else {
      setSelectedDishType("all"); // Nếu không có category, hiển thị tất cả
    }
  }, [location.search]); // Cập nhật khi query string thay đổi

  console.log("📌 Đang lọc menu theo dishType:", selectedDishType);

  // Lọc menu theo dishType
  useEffect(() => {
    // Cập nhật filteredMenu mỗi khi selectedCategory hoặc selectedDishType thay đổi
    const filtered = menu.filter((item) => {
      // Lọc theo category nếu có
      const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
      // Lọc theo dishType nếu có
      const dishTypeMatch = selectedDishType === "all" || item.dishType === selectedDishType;
      return categoryMatch && dishTypeMatch;
    });

    setFilteredMenu(filtered);
  }, [selectedCategory, selectedDishType, menu]); // Cập nhật khi selectedCategory, selectedDishType hoặc menu thay đổi


  // Thêm món vào đơn hàng
  const addToOrder = (item) => {
    setOrders((prevOrders) => {
      const existing = prevOrders.find((order) => order.id === item.id);
      if (existing) {
        return prevOrders.map((order) =>
          order.id === item.id ? { ...order, quantity: order.quantity + 1 } : order
        );
      } else {
        return [...prevOrders, { ...item, quantity: 1, image: item.imageUrl, note: "" }];
      }
    });
  };

  // Cập nhật số lượng món ăn trong giỏ hàng
  const updateQuantity = (id, amount) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.id === id ? { ...order, quantity: order.quantity + amount } : order
        )
        .filter((order) => order.quantity > 0) // Xóa nếu số lượng = 0
    );
  };

  const updateNote = (id, note) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === id ? { ...order, note } : order
      )
    );
  };

  const openDishModal = (dish) => {
    console.log("📌 Món ăn được chọn:", dish);
    setSelectedDish(dish);
  };

  const closeDishModal = () => {
    setSelectedDish(null);
  };

  // Hàm thêm món từ modal vào order
  const addToOrderFromModal = () => {
    if (!selectedDish || !selectedDish.isAvailable) return;  // Kiểm tra isAvailable
  
    addToOrder({ ...selectedDish, quantity: 1 }); // Mặc định số lượng = 1
    closeDishModal(); // Đóng modal sau khi thêm món
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    if (orders.length === 0) {
      alert("⚠️ Vui lòng chọn món trước khi đặt hàng!");
      return;
    }

    try {
      for (const item of orders) {
        const orderItem = {
          orderId: orderId,
          dishId: item.id,
          dishName: item.name,
          price: item.price,
          quantity: item.quantity,
          note: item.note || "",
        };

        console.log("🔍 Gửi order-item:", orderItem);
        await createOrderItem(orderItem);
      }

      alert("✅ Đặt món thành công!");
      setOrders([]); // Xóa giỏ hàng sau khi đặt món
    } catch (error) {
      console.error("❌ Lỗi khi tạo order-item:", error);
      alert("❌ Đặt hàng thất bại: " + (error.response?.data?.message || "Lỗi không xác định"));
    }
  };

  return (
    <div className="home-container">
      <Sidebar setSelectedDishType={setSelectedDishType} />
      <div className="head-container">
        <Header />
        {selectedDishType === "carte" && (
          <CategoryFood selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        )}
      </div>
      <div className="body-container">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p>Lỗi: {error}</p>
        ) : filteredMenu.length > 0 ? (
          <MenuGrid 
            menuItems={filteredMenu} 
            addToOrder={addToOrder} 
            openDishModal={openDishModal} 
            disableAddToOrder={(dish) => !dish.isAvailable}/>
        ) : (
          <p>Không có món ăn phù hợp.</p>
        )}
      </div>

      <div className="order-sidebar-container">
        <OrderSideBar
          orderItems={orders}
          totalPrice={orders.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
          onIncrease={(id) => updateQuantity(id, 1)}
          onDecrease={(id) => updateQuantity(id, -1)}
          onNoteChange={updateNote}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>

      {selectedDish && (
        <div className="modal-item-overlay" onClick={closeDishModal}>
          <div className="modal-item-content" onClick={(e) => e.stopPropagation()}>
            {/* Nút đóng */}
            <button className="close-button" onClick={closeDishModal}>✖</button>

            <div className="modal-item-details">
              {/* Hình ảnh bên trái */}
              <div className="modal-item-image">
                <img src={selectedDish.imageUrl} alt={selectedDish.name} />
              </div>

              {/* Nội dung bên phải */}
              <div className="modal-item-text">
                <h2>{selectedDish.name}</h2>
                <p className="dish-description">{selectedDish.description}</p>
                <p className="dish-price">{selectedDish.price.toLocaleString()} đ</p>

                {/* Nút Thêm vào giỏ */}
                <button className="add-to-cart-btn" onClick={addToOrderFromModal} disabled={!selectedDish.isAvailable}>
                  + Thêm món ăn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
