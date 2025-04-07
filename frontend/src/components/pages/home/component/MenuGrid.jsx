import MenuItemCard from "../../../layout/MenuItemCard";

const MenuGrid = ({ menuItems, addToOrder, openDishModal, disableAddToOrder }) => {
  return (
    <div className="menu-container">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item.id}
          name={item.name}
          price={item.price.toLocaleString()} // Định dạng tiền tệ
          image={item.imageUrl} // Sử dụng `imageUrl` từ API
          onAdd={() => addToOrder(item)}
          onClick={() => openDishModal(item)} // Mở modal khi nhấp vào ảnh
          isAvailable={item.isAvailable} // Truyền isAvailable vào MenuItemCard
          disableAddToOrder={disableAddToOrder} // Truyền disableAddToOrder vào MenuItemCard
        />
      ))}
    </div>
  );
};

export default MenuGrid;
