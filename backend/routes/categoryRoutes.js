const express = require("express");

const router = express.Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const verifyToken = require("../middlewares/authMiddleware");

const isAdmin = require("../middlewares/adminMiddleware");

router.get("/", getCategories);

router.post(
  "/",
  verifyToken,
  isAdmin,
  createCategory
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteCategory
);

module.exports = router;