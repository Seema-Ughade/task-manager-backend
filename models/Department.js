// models/Department.js
const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: false, // Optional if not required
    default: '#000000', // Default color (black) if none is provided
  },
  description: {
    type: String,
    required: false, // Optional
  },
}, { timestamps: true }); // Add timestamps to track createdAt and updatedAt

module.exports = mongoose.model('Department', DepartmentSchema);
