const API_URL = "http://localhost:5000/api";

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
};
