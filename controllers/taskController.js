const Task = require('../models/Task'); 
const User = require('../models/User'); 
const twilio = require('twilio');
require('dotenv').config();

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

exports.addTask = async (req, res) => {
  try {
    const { title, projectId, priority, assignedTo, dueDate, estimateTime, tags, description } = req.body;
    const attachments = req.files ? req.files.map(file => file.path) : [];

    const newTask = new Task({
      title,
      projectId,
      priority,
      assignedTo,
      dueDate,
      estimateTime,
      tags: tags.split(',').map(tag => tag.trim()),
      attachments,
      description,
    });

    const savedTask = await newTask.save();
    const user = await User.findById(assignedTo);

    if (user) {
      const message = `Hi ${user.name}, you have been assigned a new task: ${title}.\nPriority: ${priority}\nDue Date: ${dueDate}\nDescription: ${description}`;

      try {
        const messageResponse = await client.messages.create({
          from: twilioWhatsAppNumber,
          to: `whatsapp:${user.phone}`,
          body: message,
        });
        console.log('WhatsApp message sent successfully:', messageResponse.sid);
        res.status(201).json({ message: 'Task created and WhatsApp notification sent via Twilio', task: savedTask });
      } catch (error) {
        console.error('Failed to send message via Twilio:', error.message);
        res.status(500).json({ message: 'Task created, but failed to send WhatsApp message via Twilio', error: error.message });
      }
    } else {
      console.error('User not found for assignedTo ID:', assignedTo);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error while sending WhatsApp message:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Retrieve all tasks from the database
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params; // Get ID from request parameters
  try {
    const task = await Task.findById(id); // Find task by ID
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a task
exports.editTask = async (req, res) => {
  const { id } = req.params; // Get ID from request parameters
  const { title, projectId, priority, assignedTo, dueDate, estimateTime, tags, description } = req.body;
  const attachments = req.files ? req.files.map(file => file.path) : []; // Handle file uploads

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        projectId,
        priority,
        assignedTo,
        dueDate,
        estimateTime,
        tags: tags.split(',').map(tag => tag.trim()), // Split and trim tags
        attachments,
        description,
      },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params; // Get ID from request parameters

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Delete task by ID

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};