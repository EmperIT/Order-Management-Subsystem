import { useNavigate, useLocation } from "react-router-dom";
import { FaUtensils, FaHamburger, FaBook, FaShoppingCart } from "react-icons/fa";
import logo from '../../assets/icons/logo.png';

const SidebarChef = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/chefhome")}
      >
        <FaHamburger />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/chefhome")}
      >
        <FaBook />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/chefhome")}
      >
        <FaUtensils />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/order" ? "active" : ""}`} 
        onClick={() => navigate("/cheforder")}
      >
        <FaShoppingCart />
      </button>
    </div>
  );
};

export default SidebarChef;
