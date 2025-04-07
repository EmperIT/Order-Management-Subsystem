import { useNavigate, useLocation } from "react-router-dom";
import { FaUtensils, FaHamburger, FaBook, FaShoppingCart } from "react-icons/fa";
import "../styles/Sidebar.css";
import logo from '../../assets/icons/logo.png';

const SidebarChef = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the category value from the URL
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button 
        className={`nav-btn ${category === "carte" ? "active" : ""}`} 
        onClick={() => navigate("/chefhome?category=carte")}
      >
        <FaHamburger />
      </button>
      <button 
        className={`nav-btn ${category === "buffet" ? "active" : ""}`} 
        onClick={() => navigate("/chefhome?category=buffet")}
      >
        <FaBook />
      </button>
      <button 
        className={`nav-btn ${category === "combo" ? "active" : ""}`} 
        onClick={() => navigate("/chefhome?category=combo")}
      >
        <FaUtensils />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/cheforder" ? "active" : ""}`} 
        onClick={() => navigate("/cheforder")}
      >
        <FaShoppingCart />
      </button>
    </div>
  );
};

export default SidebarChef;
