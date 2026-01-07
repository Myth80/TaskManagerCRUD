const Task = require("../models/Task");

/* ---------- CREATE TASK ---------- */
exports.createTask = async (req, res) => {
  const task = await Task.create({
    user: req.user.id,
    title: req.body.title
  });
  res.status(201).json(task);
};

/* ---------- GET TASKS ---------- */
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

/* ---------- UPDATE (TOGGLE COMPLETE) ---------- */
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.completed = !task.completed; // toggle
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- DELETE TASK ---------- */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
