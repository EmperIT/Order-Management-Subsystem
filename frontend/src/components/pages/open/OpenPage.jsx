import React from "react";
import { useNavigate } from "react-router-dom";
import "./OpenPage.css";
import bgImageOpen from "../../../assets/icons/open.png"; // Đường dẫn đến hình nền
import openlogo from "../../../assets/icons/open_logo.png"; // Đường dẫn đến logo
const OpenPage = () => {
  const navigate = useNavigate();
  // Chuyển hướng đến trang TableList khi click vào button
  const handleOpenTable = () => {
    navigate("/table");
  };
  return (
    <div className="open-page" 
    style={{ 
      backgroundImage: `url(${bgImageOpen})`, 
      backgroundAttachment: "fixed" /* Giữ hình nền cố định khi cuộn */
    }}>
      <header className="header-open">
      <div className="header-open-container">
        <img src={openlogo} alt="Larana Logo" className="header-open-logo" />
      </div>
    </header>
      <div className="open-overlay"></div>

      <div className="open-content">
        <h1>
          Chào mừng bạn đến với <br />
          nhà hàng <span className="open-highlight">Larana, Inc.!</span>
        </h1>
        <p>
          Mọi người ăn bằng mắt và Larana, Inc. tạo ra một cách dễ dàng để khách hàng đặt hàng khi
          họ có thể nhìn thấy những bức ảnh đẹp về món ăn của bạn.
        </p>
        <button className="open-button" onClick={handleOpenTable}>Mở bàn ngay!</button>
      </div>
    </div>
  );
};

export default OpenPage;
