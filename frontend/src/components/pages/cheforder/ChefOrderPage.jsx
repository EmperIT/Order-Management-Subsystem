import { useState } from "react";
import SidebarChef from "../../layout/SidebarChef";
import Header from "../../layout/Header";
import Pagination from "../../layout/Pagination";
import steakImage from "../../../assets/images/Bo/2865-loi-vai-wagyu.jpg";
import ChefOrderListTable from "./component/ChefOrderListTable";

const ChefOrderPage = () => {
  const initialOrders = [
    {
      id: 1,
      orderName: "Order 01",
      table_id: "01",
      orderTime: "2025-03-25 10:30:00",
      items: [
        { id: 1, name: "Core steak 200g", price: 250000, quantity: 1, image: steakImage, status: "pending" },
        { id: 2, name: "Core steak 300g", price: 350000, quantity: 2, image: steakImage, status: "pending" },
      ],
    },
    {
      id: 2,
      orderName: "Order 02",
      table_id: "02",
      orderTime: "2025-03-25 11:00:00",
      items: [{ id: 3, name: "Core steak 200g", price: 250000, quantity: 1, image: steakImage, status: "done" }],
    },
    {
      id: 3,
      orderName: "Order 03",
      table_id: "03",
      orderTime: "2025-03-25 12:00:00",
      items: [
        { id: 4, name: "Core steak 400g", price: 450000, quantity: 1, image: steakImage, status: "pending" },
        { id: 5, name: "Core steak 200g", price: 250000, quantity: 3, image: steakImage, status: "pending" },
      ],
    },
    {
      id: 4,
      orderName: "Order 04",
      table_id: "04",
      orderTime: "2025-03-25 12:30:00",
      items: [{ id: 6, name: "Core steak 250g", price: 300000, quantity: 1, image: steakImage, status: "pending" }],
    },
    {
      id: 5,
      orderName: "Order 05",
      table_id: "05",
      orderTime: "2025-03-25 13:00:00",
      items: [{ id: 7, name: "Core steak 300g", price: 350000, quantity: 2, image: steakImage, status: "done" }],
    },
  ];

  // State quản lý danh sách đơn hàng
  const [orderlist, setOrderlist] = useState(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2); // Mặc định 2 dòng mỗi trang

  // Tính toán dữ liệu theo trang
  const totalPages = Math.ceil(orderlist.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentOrders = orderlist.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = (itemId) => {
    setOrderlist((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        items: order.items.map((item) =>
          item.id === itemId ? { ...item, status: item.status === "done" ? "pending" : "done" } : item
        ),
      }))
    );
  };

  return (
    <div className="order-container">
      <SidebarChef />
      <div className="order-content">
        <Header />
        <h2 className="order-title-page">Danh sách đơn hàng</h2>

        <div className="order-body">

          <ChefOrderListTable orders={currentOrders} onUpdateOrderStatus={handleUpdateOrderStatus} />
            <div className="pagination">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                <div className="pagination-control">
                    <label htmlFor="rowsPerPage">Số đơn hàng mỗi trang:</label>
                    <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset về trang đầu khi thay đổi số dòng
                    }}
                    >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    </select>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChefOrderPage;
