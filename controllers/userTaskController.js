const UserTask = require('../models/UserTask');
const User = require('../models/User');
const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Assign task to user
exports.assignTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, taskId } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    // Check if assignment already exists
    const existingAssignment = await UserTask.findOne({ user: userId, task: taskId });
    if (existingAssignment) {
      return res.status(400).json({ message: "Task already assigned to this user" });
    }
    
    const userTask = new UserTask({
      user: userId,
      task: taskId,
      status: "pending"
    });
    
    await userTask.save();
    
    res.status(201).json({ message: "Task assigned successfully", userTask });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error: error.message });
  }
};

// Get tasks assigned to a user
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const userTasks = await UserTask.find({ user: userId })
      .populate('task')
      .exec();
    
    res.status(200).json({ userTasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user tasks", error: error.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;
    const userTaskId = req.params.id;
    
    const userTask = await UserTask.findByIdAndUpdate(
      userTaskId,
      { status },
      { new: true }
    ).populate('task user');
    
    if (!userTask) {
      return res.status(404).json({ message: "User task not found" });
    }
    
    res.status(200).json({ message: "Task status updated successfully", userTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error: error.message });
  }
};

// Remove task assignment
exports.removeTaskAssignment = async (req, res) => {
  try {
    const userTaskId = req.params.id;
    
    const userTask = await UserTask.findByIdAndDelete(userTaskId);
    
    if (!userTask) {
      return res.status(404).json({ message: "User task not found" });
    }
    
    res.status(200).json({ message: "Task assignment removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing task assignment", error: error.message });
  }
};
