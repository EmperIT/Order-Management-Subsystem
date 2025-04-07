import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import OrderTable from "./component/OrderTable"; // Updated import
import "./OrderPage.css";
import { getAllOrdersTable, getOrderItems } from "../../../services/orderServices";
import useMenu from "../../../hooks/useMenu";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { menu, loading: menuLoading, error: menuError } = useMenu();

  useEffect(() => {
    const fetchOrdersWithItems = async () => {
      try {
        const orderId = location.state?.orderId || localStorage.getItem("orderId");

        let orderList;
        if (orderId) {
          const orderItemsResponse = await getOrderItems(orderId);

          const items = orderItemsResponse?.items || [];
          if (items.length === 0) {
            console.warn("⚠️ Không có items cho orderId:", orderId);
          }
          const itemsWithImages = items.map((item) => {
            const dish = menu.find((dish) => dish.id === item.dishId);
            return {
              ...item,
              image: dish?.imageUrl, // Fallback nếu không có imageUrl
            };
          });
          orderList = [
            {
              id: orderId,
              orderName: `Đơn hàng #${orderId}`,
              orderTime: items.length > 0 ? items[0].createdAt : new Date().toISOString(),
              items: itemsWithImages,
            },
          ];
        } else {
          orderList = await getAllOrdersTable();

          orderList = await Promise.all(
            orderList.map(async (order) => {
              const orderItemsResponse = await getOrderItems(order.id);
              const items = orderItemsResponse?.items || [];
              const itemsWithImages = items.map((item) => {
                const dish = menu.find((dish) => dish.id === item.dishId);
                return {
                  ...item,
                  image: dish?.imageUrl,
                };
              });
              return {
                ...order,
                orderName: `Đơn hàng #${order.id}`,
                orderTime: order.orderTime || (items.length > 0 ? items[0].createdAt : new Date().toISOString()),
                items: itemsWithImages,
              };
            })
          );
        }

        console.log("✅ Danh sách orders cuối cùng:", orderList);
        setOrders(orderList);
      } catch (err) {
        console.error("❌ Lỗi trong fetchOrdersWithItems:", err);
        setError("Không thể lấy danh sách đơn hàng: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!menuLoading && !menuError) {
      fetchOrdersWithItems();
    }
  }, [location.state, menu, menuLoading, menuError]);

  return (
    <div className="order-container">
      <Sidebar orderId={location.state?.orderId} />
      <div className="order-content">
        <Header />
        <h2 className="order-title-page">Danh sách đơn hàng</h2>

        <div className="order-body">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <OrderTable cart={orders.flatMap(order => order.items)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
