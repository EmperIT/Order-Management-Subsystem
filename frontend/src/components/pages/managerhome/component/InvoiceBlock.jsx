import React from "react";
import { FaFileInvoice } from "react-icons/fa";
import "../styles/Block.css";

const InvoiceBlock = () => {
  return (
    <div className="block">
      <FaFileInvoice className="block-icon" />
      <div>
        <h3>Số Lượng Hóa Đơn</h3>
        <p>250</p>
      </div>
    </div>
  );
};

export default InvoiceBlock;
