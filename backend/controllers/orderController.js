const db = require("../config/db");

exports.checkout = (req, res) => {
  const user_id = req.user.id;

  // ambil cart user
  db.query(
    `
    SELECT cart.*, books.price, books.stock, books.title
    FROM cart
    JOIN books
    ON cart.book_id = books.id
    WHERE cart.user_id=?
    `,
    [user_id],
    (err, cartItems) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message:
            "Database error",
        });
      }

      if (cartItems.length === 0) {
        return res.status(400).json({
          message:
            "Cart kosong",
        });
      }

      // cek stock
      for (let item of cartItems) {
        if (item.stock <= 0) {
          return res.status(400).json({
            message: `${item.title} out of stock`,
          });
        }

        if (
          item.quantity > item.stock
        ) {
          return res.status(400).json({
            message: `Stock ${item.title} tidak cukup`,
          });
        }
      }

      // hitung total
      let total = 0;

      cartItems.forEach((item) => {
        total +=
          item.price * item.quantity;
      });

      // insert order
      db.query(
        `
        INSERT INTO orders(user_id,total)
        VALUES(?,?)
        `,
        [user_id, total],
        (err, result) => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              message:
                "Gagal membuat order",
            });
          }

          // update stock
          cartItems.forEach((item) => {
            db.query(
              `
              UPDATE books
              SET stock = stock - ?
              WHERE id=?
              `,
              [
                item.quantity,
                item.book_id,
              ]
            );
          });

          // hapus cart
          db.query(
            `
            DELETE FROM cart
            WHERE user_id=?
            `,
            [user_id]
          );

          res.json({
            message:
              "Checkout berhasil",
          });
        }
      );
    }
  );
};

exports.getOrders = (req, res) => {
  db.query(
    `
    SELECT * FROM orders
    ORDER BY id DESC
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message:
            "Database error",
        });
      }

      res.json(result);
    }
  );
};