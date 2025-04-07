import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import SidebarChef from "../../layout/SidebarChef";
import Header from "../../layout/Header";
import MenuGridChef from "./component/MenuGridChef";
import CategoryFood from "../home/component/CategoryFood";
import useMenu from "../../../hooks/useMenu";
import { updateMenuItemAvailability } from "../../../services/menuServices";
import "./ChefHomePage.css";

const ChefHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All"); // Mặc định: tất cả món ăn
  const [selectedDishType, setSelectedDishType] = useState("All"); // Default: all dish types
  const {menu, loading, error, setMenu} = useMenu(); // Gọi API lấy danh sách món ăn
  const [filteredMenu, setFilteredMenu] = useState(menu); // Danh sách món đã lọc theo category
  const location = useLocation();

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const category = queryParams.get("category");
  
      if (category) {
        setSelectedDishType(category);
      } else {
        setSelectedDishType("All"); // Nếu không có category, hiển thị tất cả
      }
    }, [location.search]); // Cập nhật khi query string thay đổi
  
  useEffect(() => {
    setFilteredMenu(
      menu.filter(item => 
        (selectedCategory === "All" || item.category === selectedCategory) &&
        (selectedDishType === "All" || item.dishType === selectedDishType)
      )
    );
  }, [selectedCategory, selectedDishType, menu]);


  const handleToggleAvailability = async (itemId, currentAvailability) => {
    try {
      await updateMenuItemAvailability(itemId, !currentAvailability);
          // ✅ Cập nhật UI ngay sau khi API thành công
      setMenu((prevMenu) =>
        prevMenu.map((item) =>
          item.id === itemId ? { ...item, isAvailable: !currentAvailability } : item
        )
      );
      console.log("Success update") // Gọi API cập nhật trạng thái món ăn
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái món ăn:", error);
    }
  };
  
  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    setSelectedCategory(category);
  };
  const handleDishTypeSelect = (dishType) => {
    setSelectedDishType(dishType);
  };

  if (loading) {
    return <div>Đang tải menu...</div>;
  }

  if (error) {
    return <div>Đã xảy ra lỗi khi tải menu: {error.message}</div>;
  }
  return (
    <div className="home-chef-container">
      <SidebarChef setSelectedDishType={handleDishTypeSelect} />

      {/* Header trải dài từ cột 2 đến 3 */}
      <div className="head-chef-container">
        <Header />   
        {selectedDishType === "carte" && (
          <CategoryFood selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
        )}  

      </div>

      {/* Nội dung chính */}
      <div className="body-chef-container">
        {loading ? (
          <p> Đang tải dữ liệu...</p>
        ) : error ? (
          <p>Lỗi: {error}</p>
        ) : filteredMenu.length > 0 ?(
          <MenuGridChef
              menuItems={filteredMenu}
              toggleAvailability={handleToggleAvailability}
            />
        ) : (
          <p>Không có món nào phù hợp</p>
        )        
      }
      </div>

      {/* Khu vực đặt hàng */}
    </div>
  );
};

export default ChefHomePage;
