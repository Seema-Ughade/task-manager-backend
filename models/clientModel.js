// clientModel.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  profileImage: { type: String },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
