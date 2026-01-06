const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    user: req.user.id,
    title: req.body.title
  });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};
