import api from "./api";

// Lấy danh sách menu
export const getMenuItems = async () => {
  try {
    const response = await api.get("/menu");
    return response.data.dishes;
  } catch (error) {
    console.error("Lỗi khi lấy menu:", error);
    return []; // Trả về mảng rỗng để tránh lỗi null
  }
};
// Cập nhật trạng thái isAvailable bằng FormData (bắt buộc để phù hợp backend)
export const updateMenuItemAvailability = async (id, isAvailable) => {

  try{
    const response = await api.patch(`/menu/${id}/availability`, {
    isAvailable: isAvailable
  });
  return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái món ăn:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
};