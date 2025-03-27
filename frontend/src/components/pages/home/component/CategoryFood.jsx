import React, { useState } from "react";
import "../styles/CategoryFood.css";

const categories = ["All", "Bread", "Chiffon & Rolls", "Donut", "Cakes"];

const CategoryFood = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category); // Gọi hàm để cập nhật danh mục trên HomePage
  };

  return (
    <div className="category-food">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? "active" : ""}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFood;
