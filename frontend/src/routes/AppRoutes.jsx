import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import OpenPage from "../components/pages/open/OpenPage";
import TableList from "../components/pages/table/TableList";
import HomePage from "../components/pages/home/HomePage";
import OrderPage from "../components/pages/order/OrderPage";
import OrderDetail from "../components/pages/orderdetail/OrderDetail";
import ChefHomePage from "../components/pages/chefhome/ChefHomePage";
import ChefOrderPage from "../components/pages/cheforder/ChefOrderPage";
import LoginPage from "../components/pages/login/LoginPage";
import ManagerHomePage from "../components/pages/managerhome/ManagerHomePage";
import InvoicePage from "../components/pages/managerinvoices/InvoicePage";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/open" replace />} />
        <Route path="/open" element={<OpenPage />} />
        <Route path="/table" element={<TableList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orderdetail" element={<OrderDetail />} />
        <Route path="/chefhome" element={<ChefHomePage/>} />
        <Route path="/cheforder" element={<ChefOrderPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/managerhome" element={<ManagerHomePage />} />
        <Route path="/invoices" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 
