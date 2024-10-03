const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error in GET /api/todos:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    await pool.query("INSERT INTO todos (title, completed) VALUES ($1, $2)", [
      title,
      false,
    ]);
    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.error("Error in POST /api/todos:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET completed = $1 WHERE id = $2",
      [completed, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    console.error("Error in PUT /api/todos:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error in DELETE /api/todos:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
