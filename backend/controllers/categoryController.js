const db = require("../config/db");

exports.getCategories = (req, res) => {
  db.query(
    "SELECT * FROM categories",
    (err, result) => {
      res.json(result);
    }
  );
};

exports.createCategory = (req, res) => {
  const { name } = req.body;

  db.query(
    "INSERT INTO categories(name) VALUES(?)",
    [name],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Kategori sudah ada",
        });
      }

      res.json({
        message: "Category created",
      });
    }
  );
};

exports.updateCategory = (req, res) => {
  db.query(
    "UPDATE categories SET name=? WHERE id=?",
    [req.body.name, req.params.id],
    (err) => {
      res.json({
        message: "Category updated",
      });
    }
  );
};

exports.deleteCategory = (req, res) => {
  db.query(
    "DELETE FROM categories WHERE id=?",
    [req.params.id],
    (err) => {
      res.json({
        message: "Category deleted",
      });
    }
  );
};