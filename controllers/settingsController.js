// controllers/settingsController.js
const Settings = require('../models/Settings');
const multer = require('multer');
const cloudinary = require('../middlewares/cloudinaryConfig'); // Adjust the path as necessary

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([{ name: 'appLogo' }, { name: 'favicon' }]); // Define fields for multer

// Get settings
const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne(); // Assuming there's only one settings document
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update settings
const createOrUpdateSettings = async (req, res) => {
  try {
    const data = req.body;

    // Handle file uploads
    if (req.files.appLogo) {
      const appLogoUpload = await cloudinary.uploader.upload_stream();
      req.files.appLogo[0].buffer.pipe(appLogoUpload);
      appLogoUpload.on('finish', (result) => {
        data.appLogo = result.secure_url; // Store the secure URL in data
      });
    }
    if (req.files.favicon) {
      const faviconUpload = await cloudinary.uploader.upload_stream();
      req.files.favicon[0].buffer.pipe(faviconUpload);
      faviconUpload.on('finish', (result) => {
        data.favicon = result.secure_url; // Store the secure URL in data
      });
    }

    // Wait for all uploads to finish
    await Promise.all([appLogoUpload, faviconUpload]);

    const settings = await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete settings (if necessary)
const deleteSettings = async (req, res) => {
  try {
    await Settings.deleteMany({});
    res.status(204).send(); // No content to send
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export controller functions
module.exports = {
  getSettings,
  createOrUpdateSettings: upload, // Use multer middleware here
  deleteSettings,
};
