const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/auth');
const userTaskController = require('../controllers/userTaskController');
const { body } = require('express-validator');

// Validation
const validateAssignment = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('taskId').notEmpty().withMessage('Task ID is required')
];

const validateStatus = [
  body('status').isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status')
];

// All routes require authentication
router.use(authenticateToken);

// User task routes
router.get('/user/:userId', userTaskController.getUserTasks);
router.post('/assign', isAdmin, validateAssignment, userTaskController.assignTask);
router.put('/:id/status', validateStatus, userTaskController.updateTaskStatus);
router.delete('/:id', isAdmin, userTaskController.removeTaskAssignment);

module.exports = router;
