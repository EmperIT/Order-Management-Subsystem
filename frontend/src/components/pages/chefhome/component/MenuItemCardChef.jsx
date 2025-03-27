
const MenuItemCardChef = ({ name, price, image, onToggle, isSelected }) => {
    return (
    <div className="menu-card">
      <img src={image} alt={name} className="menu-image" />
      <div className="menu-card-content">
        <span className="menu-title">{name}</span>
        <span className="menu-price">{price.toLocaleString()} đ</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default MenuItemCardChef;
