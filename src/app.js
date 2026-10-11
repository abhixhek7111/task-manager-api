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
  const task = {
    id: nextId++,
    title: req.body.title,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

module.exports = app;