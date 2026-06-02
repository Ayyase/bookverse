const db = require("../config/db");

exports.addToCart = (req, res) => {
  const { book_id, quantity } =
    req.body;

  const user_id = req.user.id;

  // cek stock dulu
  db.query(
    `
    SELECT * FROM books
    WHERE id=?
    `,
    [book_id],
    (err, books) => {
      if (err) {
        return res.status(500).json(err);
      }

      const book = books[0];

      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }

      if (book.stock <= 0) {
        return res.status(400).json({
          message: "Book out of stock",
        });
      }

      db.query(
        `
        INSERT INTO cart(user_id,book_id,quantity)
        VALUES(?,?,?)
        `,
        [user_id, book_id, quantity],
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message:
              "Added to cart",
          });
        }
      );
    }
  );
};

exports.getCart = (req, res) => {
  db.query(
    `
    SELECT cart.*, books.title,
    books.price,
    books.image,
    books.stock
    FROM cart
    JOIN books
    ON cart.book_id = books.id
    WHERE cart.user_id=?
    `,
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

exports.deleteCart = (req, res) => {
  db.query(
    `
    DELETE FROM cart
    WHERE id=?
    `,
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Cart deleted",
      });
    }
  );
};