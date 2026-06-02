const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  deleteCart,
} = require("../controllers/cartController");

const verifyToken = require("../middlewares/authMiddleware");

router.post(
  "/",
  verifyToken,
  addToCart
);

router.get(
  "/",
  verifyToken,
  getCart
);

router.delete(
  "/:id",
  verifyToken,
  deleteCart
);

module.exports = router;