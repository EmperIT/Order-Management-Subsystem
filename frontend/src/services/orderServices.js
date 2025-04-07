import api from "./api";

// Orders
export const createOrder = async (order) => {
  try {
    const response = await api.post("/order", order);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo order:", error);
    return null;
  }
};

export const getAllOrdersTable = async (page = 1, limit = 10) => {
  try {
    const response = await api.get("/order/tables", { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy orders:", error);
    return [];
  }
};

export const getAllOrders = async (page = 1, limit = 30) => {
  try {
    const response = await api.get("/order", { params: { page, limit } });
    return response.data; // Trả về các đơn hàng
  } catch (error) {
    console.error("Lỗi khi lấy orders:", error);
    return [];
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy order:", error);
    return null;
  }
};

export const updateOrder = async (id, data) => {
  try {
    const response = await api.patch(`/order/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật order:", error);
    return null;
  }
};

// Order Items
export const createOrderItem = async (orderItem) => {
  try {
    const response = await api.post("/order/order-items", orderItem);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo order item:", error);
    return null;
  }
};

export const getOrderItems = async (orderId) => {
  try {
    const response = await api.get("/order/order-items", { params: { orderId } });
    return response.data; // Trả về { items: [...], total: ... }
  } catch (error) {
    console.error("❌ Lỗi khi gọi API getOrderItems:");
    return { items: [], total: 0 }; // Trả về mặc định nếu lỗi
  }
};
export const getOrderItemById = async (id) => {
  try {
    const response = await api.get(`/order/order-items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy order item:", error);
    return null;
  }
};

export const updateOrderItem = async (id, data) => {
  try {
    const response = await api.patch(`/order/order-items/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật order item:", error);
    return null;
  }
};

export const removeOrderItem = async (id) => {
  try {
    const response = await api.delete(`/order/order-items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa order item:", error);
    return null;
  }
};

// Tables
export const createTable = async (table) => {
  try {
    const response = await api.post("/order/tables", table);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo bàn:", error);
    return null;
  }
};

export const getAllTables = async (page = 1, limit = 10) => {
  try {
    const response = await api.get("/order/tables", { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bàn:", error);
    return [];
  }
};

export const getTableById = async (id) => {
  try {
    const response = await api.get(`/order/tables/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy bàn:", error);
    return null;
  }
};

export const updateTable = async (id, data) => {
  try {
    const response = await api.patch(`/order/tables/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật bàn:", error);
    return null;
  }
};

export const removeTable = async (id) => {
  try {
    const response = await api.delete(`/order/tables/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa bàn:", error);
    return null;
  }
};

// Orders by Time Range
export const getOrdersByTimeRange = async (startTime, endTime) => {
  try {
    const response = await api.get("/order/time-range", { params: { startTime, endTime } });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy orders theo khoảng thời gian:", error);
    return [];
  }
};