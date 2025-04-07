import React from "react";
import "../styles/OrderNote.css";

const OrderNote = ({ value, onNoteChange }) => {
  return (
    <div className="order-note">
      <textarea 
        placeholder="Ghi chú...." 
        value={value} 
        onChange={onNoteChange} 
      />
    </div>
  );
};

export default OrderNote;
