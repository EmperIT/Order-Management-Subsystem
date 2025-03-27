import React, { useState } from "react";
import "./LoginPage.css";
import logo from "../../../assets/icons/logo.png";
import nameSystem from "../../../assets/icons/nameSystem.png";
import chefImage from "../../../assets/icons/login_logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Larana Inc." className="logo-login" />
        <img src={nameSystem} alt="Larana Inc." className="name-system" />
      </div>
      <div className="login-content">
        <div className="login-left">
          <img src={chefImage} alt="Chef Illustration" className="chef-image" />
        </div>
        <div className="login-right">
          <h2 className="welcome-text">Chào mừng trở lại!</h2>
          <p className="sub-text">Chào mừng trở lại! Vui lòng nhập thông tin của bạn.</p>

          <form className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Nhập email" required />
            </div>
            <div className="input-group">
              <label>Mật khẩu</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  required
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="login-btn">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
