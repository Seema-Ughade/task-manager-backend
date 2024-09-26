const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  getClients,
  getDepartments,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Client routes
router.get('/clients', getClients); // Get all clients
router.get('/departments', getDepartments); // Get departments
router.post('/clients', upload.single('profileImage'), createClient); // Create a new client
router.put('/clients/:id', upload.single('profileImage'), updateClient); // Update a client
router.delete('/clients/:id', deleteClient); // Delete a client

module.exports = router;
