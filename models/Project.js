const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  users: {
    type: [String], // Array of strings for user IDs or names
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
