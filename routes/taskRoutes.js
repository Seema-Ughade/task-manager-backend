const express = require('express');
const { 
  addTask, 
  getTasks, 
  getTaskById, 
  editTask, 
  deleteTask 
} = require('../controllers/taskController'); // Import all functions
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/tasks', upload.array('attachments'), addTask); // Use upload middleware for file attachments
router.get('/tasks', getTasks); // Get all tasks
router.get('/tasks/:id', getTaskById); // Get task by ID
router.put('/tasks/:id', upload.array('attachments'), editTask); // Edit task by ID, handle file uploads
router.delete('/tasks/:id', deleteTask); // Delete task by ID

module.exports = router;
