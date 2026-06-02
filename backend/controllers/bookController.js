const db = require("../config/db");

exports.getBooks = (req, res) => {
  db.query(
    `
    SELECT books.*, categories.name AS category
    FROM books
    JOIN categories
    ON books.category_id = categories.id
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

exports.getBookById = (req, res) => {
  db.query(
    "SELECT * FROM books WHERE id=?",
    [req.params.id],
    (err, result) => {
      res.json(result[0]);
    }
  );
};

exports.createBook = (req, res) => {
  const {
    title,
    author,
    price,
    stock,
    description,
    category_id,
  } = req.body;

  const image = req.file
    ? req.file.filename
    : null;

  db.query(
    `
    INSERT INTO books
    (title,author,price,stock,description,image,category_id)
    VALUES(?,?,?,?,?,?,?)
    `,
    [
      title,
      author,
      price,
      stock,
      description,
      image,
      category_id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Book created",
      });
    }
  );
};

exports.updateBook = (req, res) => {
  const {
    title,
    author,
    price,
    stock,
    description,
    category_id,
    oldImage,
  } = req.body;

  const image = req.file
    ? req.file.filename
    : oldImage;

  db.query(
    `
    UPDATE books SET
    title=?,
    author=?,
    price=?,
    stock=?,
    description=?,
    image=?,
    category_id=?
    WHERE id=?
    `,
    [
      title,
      author,
      price,
      stock,
      description,
      image,
      category_id,
      req.params.id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Book updated",
      });
    }
  );
};

exports.deleteBook = (req, res) => {
  db.query(
    "DELETE FROM books WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Book deleted",
      });
    }
  );
};

