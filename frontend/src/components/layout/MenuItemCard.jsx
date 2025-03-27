import "../styles/MenuItemCard.css";

const MenuItemCard = ({ name, price, image, onAdd }) => {
  return (
    <div className="menu-card">
      <img src={image} alt={name} className="menu-image" />
      <div className="menu-card-content">
        <span className="menu-title">{name}</span>
        <span className="menu-price">{price.toLocaleString()} đ</span>
        <button className="menu-add-btn" onClick={onAdd}>+</button>
      </div>
    </div>
  );
};

export default MenuItemCard;
