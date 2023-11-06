const Task = require("../models/Task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// create a new task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get single task
const getTask = async (req, res) => {
  try {
    const singleTask = await Task.findOne({
      _id: req.params.id,
    });
    if (!singleTask) {
      return res
        .status(404)
        .json({ msg: `Task with ID: ${req.params.id} not found` });
    }
    res.status(200).json(singleTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTask) {
      return res.status(404).json({
        msg: `Task with ID: ${req.params.id} can't be updated: "NOT FOUND"`,
      });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id });
    if (!deletedTask) {
      return res.status(404).res.json({
        msg: `Task with ID: ${req.params.id} can't be deleted "Does not Exist`,
      });
    }
    res.json({ deletedTask });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// const writeData = require("../utils/write-to-database");
// const crypto = require("crypto");
// let tasks = require("../database/tasks.json");

// // get all tasks
// const getAllTask = (req, res) => {
//   res.json(tasks);
// };

// // create a new task
// const createTask = (req, res) => {
//   const newTask = { id: crypto.randomUUID(), completed: false, ...req.body };
//   tasks.push(newTask);
//   writeData(tasks);
//   res.json(newTask);
// };

// //get single task
// const getTask = (req, res) => {
//   const singleTask = tasks.find((task) => task.id === req.params.id);
//   res.json(singleTask);
// };

// // update task
// const updateTask = (req, res) => {
//   const singleTask = tasks.find((task) => task.id === req.params.id);
//   const updatedTask = { ...singleTask, ...req.body };
//   tasks = tasks.map((task) => {
//     if (task.id === req.params.id) {
//       return updatedTask;
//     } else {
//       return task;
//     }
//   });
//   writeData(tasks);
//   res.send({ taskid: updatedTask.id });
// };

// //delete task
// const deleteTask = (req, res) => {
//   tasks = tasks.filter((task) => task.id !== req.params.id);
//   writeData(tasks);
//   res.send({ message: "Delete Task" });
// };

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
