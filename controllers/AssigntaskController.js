// controllers/taskController.js
const Task = require('../models/AssignTask');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { assignedTo, projectId, dueDate, status, pageSize, sortBy } = req.body;
    
    const newTask = new Task({
      assignedTo,
      projectId,
      dueDate,
      status,
      pageSize,
      sortBy
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo projectId');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo projectId');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
