// clientRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { getClients, getDepartments, createClient } = require('../controllers/clientController');

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

router.get('/clients', getClients);
router.get('/departments', getDepartments);
router.post('/clients', upload.single('profileImage'), createClient);

module.exports = router;
