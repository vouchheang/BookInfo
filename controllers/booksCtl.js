const pool = require("../config/db");

//Post
const CreateBook = async (req, res) => {
  const { id, title, category_id, author_id } = req.body;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category_id INT,
      author_id INT,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (author_id) REFERENCES authors(id)
    )
  `;

  const insertQuery = `
  INSERT INTO books (id, title, category_id, author_id)
  VALUES ($1, $2, $3, $4) RETURNING id, title, category_id, author_id
`;

  try {
    await pool.query(createTableQuery);
    const result = await pool.query(insertQuery, [
      id,
      title,
      category_id,
      author_id,
    ]);

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
const GetallBooks = async (req, res) => {
  const selectQuery = `SELECT books.id, 
    books.title AS "Title",
    categories.name AS "Category_name",
    authors.name AS "Author_name"
    FROM books
    JOIN categories ON books.category_id = categories.id
    JOIN authors ON books.author_id = authors.id`;

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

// //Update
const UpdatedBook = async (req, res) => {
  const { id } = req.params;
  const { title, category_id, author_id} = req.body;

  const updateQuery = `
    UPDATE books
    SET title = $2,
    category_id = $3,
    author_id = $4
    WHERE id = $1
    RETURNING id, title, category_id, author_id
  `;

  try {
    const result = await pool.query(updateQuery, [id, title, category_id, author_id]);
    res.status(200).json({
      message: "Task updated successfully",
      task: result.rows,
    });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// //Delete
const DeleteBook = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `
    DELETE FROM books
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
module.exports = { CreateBook, GetallBooks, UpdatedBook, DeleteBook};


