exports.getUsers = (req, res) => {
    res.json({ message: "Danh sách người dùng" });
};

exports.createUser = (req, res) => {
    res.json({ message: "Người dùng đã được tạo" });
};
