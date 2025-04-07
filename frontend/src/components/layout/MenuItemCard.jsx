import "../styles/MenuItemCard.css";

const MenuItemCard = ({ name, price, image, onAdd, onClick, isAvailable }) => {
  return (
    <div className="menu-card" onClick={onClick}>
      <img src={image} alt={name} className="menu-image" />
      <div className="menu-card-content">
        <span className="menu-title">{name}</span>
        <span className="menu-price">{price.toLocaleString()} đ</span>
        
        {/* Nút "Thêm món ăn" */}
        <button
          className={`menu-add-btn ${!isAvailable ? "disabled" : ""}`} // Thêm class "disabled" nếu không có sẵn
          onClick={(e) => {
            e.stopPropagation(); // Ngăn click vào button mở modal
            onAdd();
          }}
          disabled={!isAvailable} // Disable nếu món ăn không có sẵn
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
