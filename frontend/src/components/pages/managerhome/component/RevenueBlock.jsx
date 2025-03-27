import React from "react";
import { FaDollarSign } from "react-icons/fa";
import "../styles/Block.css";

const RevenueBlock = () => {
  return (
    <div className="block">
      <FaDollarSign className="block-icon" />
      <div>
        <h3>Tổng Doanh Thu</h3>
        <p>1,200,000,000đ</p>
      </div>
    </div>
  );
};

export default RevenueBlock;
