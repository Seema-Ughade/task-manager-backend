const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust path based on your folder structure
const singleUpload = require('../middlewares/multer'); // Adjust the path as needed

// User CRUD routes

// Get all users
router.get('/', userController.getUsers);

// Create a new user
router.post('/', singleUpload, userController.createUser); // Apply singleUpload middleware

// Update a user
router.put('/:id', singleUpload, userController.updateUser); // Apply singleUpload middleware

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
