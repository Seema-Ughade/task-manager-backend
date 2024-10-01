// models/ActivityType.js

const mongoose = require('mongoose');

const ActivityTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const ActivityType = mongoose.model('ActivityType', ActivityTypeSchema);

module.exports = ActivityType;
