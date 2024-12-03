const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);

// Thêm người dùng mới
router.post("/create", userController.createUser);

// Sửa thông tin người dùng
router.put("/update/:id", userController.updateUser);

// Xóa người dùng
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;