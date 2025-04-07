import React from "react";

const MenuItemCardChef = ({
  name,
  price,
  image,
  isAvailable,
  onToggleAvailability,  // Đảm bảo hàm này được nhận và sử dụng đúng
}) => {
  return (
    <div className="menu-card">
      <img src={image} alt={name} className="menu-image" />
      <div className="menu-card-content">
        <span className="menu-title">{name}</span>
        <span className="menu-price">{price.toLocaleString()} đ</span>

        {/* Switch để bật/tắt trạng thái isAvailable */}
        <label className="switch">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={onToggleAvailability} 
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default MenuItemCardChef;
