// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: { type: Date },
  estimateTime: { type: String },
  tags: { type: [String] },
  attachments: { type: [String] }, // Store file URLs for attachments
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
