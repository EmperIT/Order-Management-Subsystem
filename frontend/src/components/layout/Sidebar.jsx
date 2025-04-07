import { useNavigate, useLocation } from "react-router-dom";
import { FaUtensils, FaHamburger, FaBook, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import "../styles/Sidebar.css";
import logo from '../../assets/icons/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy giá trị của category từ URL
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button 
        className={`nav-btn ${category === "carte" ? "active" : ""}`} 
        onClick={() => navigate("/home?category=carte")}
      >
        <FaHamburger />
      </button>
      <button 
        className={`nav-btn ${category === "buffet" ? "active" : ""}`} 
        onClick={() => navigate("/home?category=buffet")}
      >
        <FaBook />
      </button>
      <button 
        className={`nav-btn ${category === "combo" ? "active" : ""}`} 
        onClick={() => navigate("/home?category=combo")}
      >
        <FaUtensils />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/order" ? "active" : ""}`} 
        onClick={() => navigate("/order")}
      >
        <FaShoppingCart />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/orderdetail" ? "active" : ""}`} 
        onClick={() => navigate("/orderdetail")}
      >
        <FaMoneyBillWave />
      </button>
    </div>
  );
};

export default Sidebar;
