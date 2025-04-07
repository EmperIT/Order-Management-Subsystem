import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

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
      <button 
        className="pagination-btn prev" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>

      <div className="pagination-numbers">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            className={`pagination-number ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageClick(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

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
