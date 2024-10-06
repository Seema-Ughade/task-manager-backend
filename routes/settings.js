// // routes/settings.js
// const express = require('express');
// const { getSettings, createOrUpdateSettings, deleteSettings, upload } = require('../controllers/settingsController');

// const router = express.Router();

// // Get settings
// router.get('/', getSettings);

// // Create or update settings
// router.post('/', upload.fields([{ name: 'appLogo' }, { name: 'favicon' }]), createOrUpdateSettings);

// // Delete settings (if necessary)
// router.delete('/', deleteSettings);

// module.exports = router;
// routes/settings.js
const express = require('express');
const { getSettings, createOrUpdateSettings, deleteSettings } = require('../controllers/settingsController');

const router = express.Router();

// Get settings
router.get('/', getSettings);

// Create or update settings
router.post('/', createOrUpdateSettings); // multer middleware is applied in the controller

// Delete settings (if necessary)
router.delete('/', deleteSettings);

module.exports = router;
