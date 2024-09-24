const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust path based on your folder structure
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage }); // Initialize multer with the storage settings

// User CRUD routes

// Get all users
router.get('/', userController.getUsers);

// Create a new user
router.post('/', upload.single('profileImage'), userController.createUser);

// Update a user
router.put('/:id', upload.single('profileImage'), userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
