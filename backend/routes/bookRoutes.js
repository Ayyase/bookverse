const express = require("express");

const router = express.Router();

const bookController = require("../controllers/bookController");

const verifyToken = require("../middlewares/authMiddleware");

const isAdmin = require("../middlewares/adminMiddleware");

const upload = require("../middlewares/uploadMiddleware");

router.get("/", bookController.getBooks);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  bookController.createBook
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  bookController.updateBook
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  bookController.deleteBook
);

module.exports = router;