const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/auth');
const taskController = require('../controllers/taskController');
const { body } = require('express-validator');

// Task validation
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format')
];

// All task routes require authentication
router.use(authenticateToken);

// Task routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

// Create, update, delete tasks (admin only)
router.post('/', isAdmin, validateTask, taskController.createTask);
router.put('/:id', isAdmin, validateTask, taskController.updateTask);
router.delete('/:id', isAdmin, taskController.deleteTask);

module.exports = router;
