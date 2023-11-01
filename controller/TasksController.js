const writeData = require("../utils/write-to-database");
const crypto = require("crypto");

let tasks = require("../database/tasks.json");

// get all tasks
const getAllTask = (req, res) => {
  res.json(tasks);
};

// create a new task
const createTask = (req, res) => {
  const newTask = { id: crypto.randomUUID(), completed: false, ...req.body };
  tasks.push(newTask);
  writeData(tasks);
  res.json(newTask);
};

//get single task
const getTask = (req, res) => {
  const singleTask = tasks.find((task) => task.id === req.params.id);
  res.json(singleTask);
};

// update task
const updateTask = (req, res) => {
  const singleTask = tasks.find((task) => task.id === req.params.id);
  const updatedTask = { ...singleTask, ...req.body };
  tasks = tasks.map((task) => {
    if (task.id === req.params.id) {
      return updatedTask;
    } else {
      return task;
    }
  });
  writeData(tasks);
  res.send(updatedTask);
};

//delete task
const deleteTask = (req, res) => {
  tasks = tasks.filter((task) => task.id !== req.params.id);
  writeData(tasks);
  res.send({ message: "Delete Task" });
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
