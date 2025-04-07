import { useEffect, useState } from "react";
import SidebarChef from "../../layout/SidebarChef";
import Header from "../../layout/Header";
import Pagination from "../../layout/Pagination";
import { getAllOrders } from "../../../services/orderServices";
import useMenu from "../../../hooks/useMenu";
import ChefOrderTable from "./component/ChefOrderTable";

const ChefOrderPage = () => {
  const [orderItems, setOrderItems] = useState([]); // Lưu tất cả món ăn
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Mặc định 5 món ăn mỗi trang
  const [totalItems, setTotalItems] = useState(0); // Tổng số món ăn
  const { menu } = useMenu();

  // Tính toán tổng số trang
  const totalPages = totalItems ? Math.ceil(totalItems / rowsPerPage) : 0;
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = orderItems.slice(indexOfFirstItem, indexOfLastItem); // <-- cắt ở đây
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(); // Lấy tất cả đơn hàng
        console.log("Dữ liệu trả về từ API:", response); // In ra để kiểm tra

        // Kiểm tra cấu trúc dữ liệu trả về từ API
        if (response && Array.isArray(response.orders)) {
          // Lọc các đơn hàng có `items`
          const filteredOrders = response.orders.filter(order => order.items && order.items.length > 0);
          const menuMap = new Map();
          menu.forEach((m) => {
            menuMap.set(m.id, m);
          });
          const allItems = filteredOrders.flatMap(order =>
            order.items.map(item => {
              const matchedMenu = menuMap.get(item.dishId); // Gắn thông tin món từ menu
              return {
                ...item,
                tableName: order.tableName,
                imageUrl: matchedMenu?.imageUrl || "",      // Gắn imageUrl
              };
            })
          );
          
          // Sắp xếp các món ăn theo thời gian (từ mới nhất)
          const sortedItems = allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          setOrderItems(sortedItems); // Cập nhật state với danh sách món ăn đã sắp xếp
          setTotalItems(sortedItems.length); // Cập nhật tổng số món ăn
        } else {
          console.error("Dữ liệu không hợp lệ:", response);
        }
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        setOrderItems([]); // Đảm bảo luôn có mảng rỗng khi có lỗi
        setTotalItems(0);
      }
    };
    fetchOrders();
  }, [menu]);

  // Xử lý sự thay đổi của rowsPerPage và reset trang về 1
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset lại về trang đầu tiên khi thay đổi số lượng món ăn mỗi trang
  };

  return (
    <div className="order-container">
      <SidebarChef />
      <div className="order-content">
        <Header />
        <h2 className="order-title-page">Danh sách món ăn</h2>

        <div className="order-body">
          {orderItems.length > 0 ? (
            <>
              <ChefOrderTable
                items={currentItems} // Truyền tất cả món ăn vào ChefOrderTable
                isHeader={true} // Render thead trong ChefOrderTable
              />
            </>
          ) : (
            <p>Không có món ăn để hiển thị.</p>
          )}

          <div className="pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <div className="pagination-control">
              <label htmlFor="rowsPerPage">Số món ăn mỗi trang:</label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange} // Cập nhật số món ăn mỗi trang và reset trang
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefOrderPage;
