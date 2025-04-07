import MenuItemCardChef from "./MenuItemCardChef";

const MenuGridChef = ({ menuItems, toggleAvailability }) => {
  return (
    <div className="menu-container">
      {menuItems.map((item) => (
        <MenuItemCardChef
          key={item.id}
          name={item.name}
          price={item.price}
          image={item.imageUrl}
          isAvailable={item.isAvailable}
          onToggleAvailability={() =>
            toggleAvailability(item.id, item.isAvailable)
          }        />
      ))}
    </div>
  );
};

export default MenuGridChef;
