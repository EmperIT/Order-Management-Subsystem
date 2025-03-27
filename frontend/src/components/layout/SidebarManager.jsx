import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaFileInvoice } from "react-icons/fa";
import logo from '../../assets/icons/logo.png';

const SidebarManager = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button 
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`} 
        onClick={() => navigate("/managerhome")}
      >
        <FaHome/>
      </button>
      <button 
        className={`nav-btn ${location.pathname === "/invoices" ? "active" : ""}`} 
        onClick={() => navigate("/invoices")}
      >
        <FaFileInvoice/>
      </button>

    </div>
  );
};

export default SidebarManager;
