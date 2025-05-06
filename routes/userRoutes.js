// const express = require('express');
// const router = express.Router();
// const { authenticateToken, isAdmin } = require('../middleware/auth');
// const userController = require('../controllers/userController');

// // All user routes require authentication
// router.use(authenticateToken);

// // Get current user profile
// router.get('/me', userController.getCurrentUser);

// // Update current user profile
// router.put('/me', userController.updateCurrentUser);

// // Admin-only routes
// router.get('/', isAdmin, userController.getAllUsers);
// router.get('/:id', isAdmin, userController.getUserById);
// router.put('/:id', isAdmin, userController.updateUser);
// router.delete('/:id', isAdmin, userController.deleteUser);

// module.exports = router;
