const Task = require('../models/Task');
const UserTask = require('../models/UserTask');
const { validationResult } = require('express-validator');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate } = req.body;
    
    const task = new Task({
      title,
      description,
      dueDate: new Date(dueDate)
    });
    
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate } = req.body;
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate: new Date(dueDate) },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    // Also delete all user-task associations
    await UserTask.deleteMany({ task: req.params.id });
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};
