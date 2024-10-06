const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  appName: { type: String, required: true },
  companyName: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyPhone: { type: String, required: true },
  workingDays: { type: String, required: true },
  workingHours: { type: String, required: true },
  address: { type: String, required: true },
  appLogo: { type: String }, // Store the path of the uploaded logo
  favicon: { type: String }, // Store the path of the uploaded favicon
  taskStatus: { type: String }, // Reference ID for the task status
  recaptchaSiteKey: { type: String },
  recaptchaSecretKey: { type: String },
});

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
