// models/Task.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignTaskModelSchema = new Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'in-progress'],
    default: 'pending'
  },
  pageSize: {
    type: Number,
    required: true
  },
  sortBy: {
    type: String,
    enum: ['title', 'dueDate', 'status'],
    default: 'title'
  }
});

module.exports = mongoose.model('AssignTaskModel', AssignTaskModelSchema);
