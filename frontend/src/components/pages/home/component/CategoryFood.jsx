import React from "react";
import "../styles/CategoryFood.css";

const categories = ["All", "Heo", "Bò", "Gà", "Cá"]; // Danh sách các category có thể tùy chỉnh

const CategoryFood = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-food">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? "active" : ""}`}
          onClick={() => onSelectCategory(category)} // Gọi hàm từ HomePage để cập nhật category
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFood;
