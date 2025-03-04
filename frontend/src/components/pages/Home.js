import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/api";

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(data => setUsers(data));
    }, []);

    return (
        <div>
            <h1>Danh sách người dùng</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
