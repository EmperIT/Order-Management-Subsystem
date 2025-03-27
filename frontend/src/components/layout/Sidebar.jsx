import { useNavigate, useLocation } from "react-router-dom";
import { FaUtensils, FaHamburger, FaBook, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import "../styles/Sidebar.css";
import logo from '../../assets/icons/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/home")}
      >
        <FaHamburger />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/home")}
      >
        <FaBook />
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/home")}
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
