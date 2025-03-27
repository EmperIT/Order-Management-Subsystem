import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import OrderListTable from "./component/OrderListTable";
import "./OrderPage.css";

import steakImage from "../../../assets/images/Bo/2865-loi-vai-wagyu.jpg";

const OrderPage = () => {
  const orders = [
    {
      id: 1,
      orderName: "Order 01",
      orderTime: "2025-03-25 10:30:00",
      items: [
        { id: 1, name: "Core steak 200g", price: 250000, quantity: 1, image: steakImage },
        { id: 2, name: "Core steak 300g", price: 350000, quantity: 2, image: steakImage },
        { id: 3, name: "Core steak 300g", price: 350000, quantity: 2, image: steakImage },
        { id: 4, name: "Core steak 300g", price: 350000, quantity: 2, image: steakImage },
        { id: 5, name: "Core steak 300g", price: 350000, quantity: 2, image: steakImage },
      ],
      status: "pending",
    },
    {
      id: 2,
      orderName: "Order 01",
      orderTime: "2025-03-25 11:00:00",
      items: [
        { id: 3, name: "Core steak 200g", price: 250000, quantity: 1, image: steakImage },
      ],
      status: "done",
    },
    {
      id: 3,
      orderName: "Order 01",
      orderTime: "2025-03-25 12:00:00",
      items: [
        { id: 4, name: "Core steak 400g", price: 450000, quantity: 1, image: steakImage },
        { id: 5, name: "Core steak 200g", price: 250000, quantity: 3, image: steakImage },
      ],
      status: "pending",
    },
  ];

  const [orderlist] = useState(orders);
  return (
    <div className="order-container">
      <Sidebar />
      <div className="order-content">
        <Header />
        <h2 className="order-title-page">Danh sách đơn hàng</h2>

        <div className="order-body">
          <OrderListTable orders={orderlist}/> 
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
