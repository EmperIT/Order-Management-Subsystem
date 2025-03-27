import React, { useState } from "react";
import "../styles/TitleDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TitleDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <header className="title-dashboard">
      <h1>Dashboard</h1>
      <div className="filters-dashboard">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="today">Hôm nay</option>
          <option value="week">Trong tuần</option>
          <option value="month">Trong tháng</option>
          <option value="year">Trong năm</option>
          <option value="custom">Chọn thời gian</option>
        </select>

        {selectedFilter === "custom" && (
          <div className="date-range-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Bắt đầu"
            />
            <span> - </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Kết thúc"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default TitleDashboard;
