const db = require("../config/db");

exports.getUsers = (req, res) => {
  db.query(
    "SELECT id,name,email,role FROM users",
    (err, result) => {
      res.json(result);
    }
  );
};