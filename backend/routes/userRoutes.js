const express = require("express");

const router = express.Router();

const {
  getUsers,
} = require("../controllers/userController");

const verifyToken = require("../middlewares/authMiddleware");

const isAdmin = require("../middlewares/adminMiddleware");

router.get(
  "/",
  verifyToken,
  isAdmin,
  getUsers
);

module.exports = router;