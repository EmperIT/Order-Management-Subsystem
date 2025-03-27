import React from "react";
import "../styles/Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Xử lý chuyển trang
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      {/* Nút Previous */}
      <button 
        className="pagination-btn prev" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>

      {/* Danh sách số trang */}
      <div className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`pagination-number ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Nút Next */}
      <button 
        className="pagination-btn next" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
