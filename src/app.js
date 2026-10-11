const express = require("express");

const app = express();
app.use(express.json());

const tasks = [];
let nextId = 1;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const title = req.body?.title;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Task title is required",
    });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!Number.isInteger(id) || !task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!Number.isInteger(id) || !task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "Task title must be a non-empty string",
      });
    }

    task.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Completed must be a boolean",
      });
    }

    task.completed = completed;
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);

  if (!Number.isInteger(id) || index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

module.exports = app;