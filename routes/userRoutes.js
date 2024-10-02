// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController'); // Adjust path based on your folder structure
// const singleUpload = require('../middlewares/multer'); // Adjust the path as needed

// // User CRUD routes

// // Get all users
// router.get('/', userController.getUsers);

// // Create a new user
// router.post('/', singleUpload, userController.createUser); // Apply singleUpload middleware

// // Update a user
// router.put('/:id', singleUpload, userController.updateUser); // Apply singleUpload middleware

// // Delete a user
// router.delete('/:id', userController.deleteUser);

// module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const multer = require('multer'); // Middleware for handling file uploads

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Using memory storage for Cloudinary uploads
const upload = multer({ storage });

// Define user routes
router.post('/', upload.single('profilePicture'), userController.createUser); // Create a user
router.get('/', userController.getUsers); // Get all users
router.get('/:id', userController.getUserById); // Get a user by ID
router.put('/:id', upload.single('profilePicture'), userController.updateUser); // Update a user
router.delete('/:id', userController.deleteUser); // Delete a user

module.exports = router;
