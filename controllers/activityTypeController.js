// controllers/activityTypeController.js

const ActivityType = require('../models/ActivityType');

// Get all activity types
const getAllActivityTypes = async (req, res) => {
  try {
    const activityTypes = await ActivityType.find();
    res.status(200).json(activityTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity types' });
  }
};

// Create a new activity type
const createActivityType = async (req, res) => {
  const { name } = req.body;
  try {
    const newActivityType = new ActivityType({ name });
    await newActivityType.save();
    res.status(201).json(newActivityType);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity type' });
  }
};

// Update an activity type by ID
const updateActivityType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedActivityType = await ActivityType.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedActivityType);
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity type' });
  }
};

// Delete an activity type by ID
const deleteActivityType = async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityType.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity type' });
  }
};

module.exports = {
  getAllActivityTypes,
  createActivityType,
  updateActivityType,
  deleteActivityType,
};
