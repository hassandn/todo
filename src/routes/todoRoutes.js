const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// create todo
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({ title, user: req.user._id });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// retrieve todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id 
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "server error.", error: err.message });
  }
});
// update todo
router.put("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "todo not found." });

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  await todo.save();
  res.json(todo);
});
// update todo
router.patch("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "todo not found." });

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  await todo.save();
  res.json(todo);
});
// delete todo
router.delete("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "todo not found" });

  res.json({ message: "todo deleted" });
});

module.exports = router;