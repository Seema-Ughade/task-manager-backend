const Status = require('../models/Status');

// Get all statuses
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new status
const createStatus = async (req, res) => {
  const { name, order } = req.body;
  const newStatus = new Status({ name, order });

  try {
    const savedStatus = await newStatus.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a status
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { name, order } = req.body;

  try {
    const updatedStatus = await Status.findByIdAndUpdate(id, { name, order }, { new: true });
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a status
const deleteStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await Status.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllStatuses,
  createStatus,
  updateStatus,
  deleteStatus,
};
