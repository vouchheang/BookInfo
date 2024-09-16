const pool = require("../config/db");

//Post
const CreateCat = async (req, res) => {
  const { id, name } = req.body;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    )
  `;

    const insertQuery = `
      INSERT INTO categories (id, name)
      VALUES ($1, $2) RETURNING id, name
    `;

  try {
    await pool.query(createTableQuery);
    const result = await pool.query(insertQuery, [id, name]);

    res.status(201).json({
      message: "Task created successfully",
      task: result.rows,
    });
  } catch (err) {
    console.error("Error inserting task:", err);
    res.status(500).send("Server error");
  }
};

//Get all
const GetallCat = async (req, res) => {
    const selectQuery = "SELECT * FROM categories";
  
    try {
      const result = await pool.query(selectQuery);
  
      res.status(200).json({
        message: "Data fetched successfully",
        data: result.rows,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

//Update
const UpdatedCat = async (req, res) => {
  const { id } = req.params;
  const { name} = req.body;

  const updateQuery = `
    UPDATE categories
    SET name = $2
    WHERE id = $1
    RETURNING id, name
  `;

  try {
    const result = await pool.query(updateQuery, [id, name]);
    res.status(200).json({
      message: "Task updated successfully",
      task: result.rows,
    });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete
const DeleteCat = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `
    DELETE FROM categories
    WHERE id = $1
    RETURNING id
  `;

  try {
    const result = await pool.query(deleteQuery, [id]);

    res.status(200).json({
      message: "Task deleted successfully",
      id: result.rows,
    });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { CreateCat, GetallCat, UpdatedCat, DeleteCat };
