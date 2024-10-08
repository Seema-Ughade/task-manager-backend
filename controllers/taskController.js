require('dotenv').config(); // Load environment variables from .env file

const Task = require('../models/Task'); // Assuming Task is your mongoose model
const User = require('../models/User'); // Assuming User is your mongoose model
const twilio = require('twilio');

// Twilio credentials (replace with your actual credentials)
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID from .env
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Twilio Auth Token from .env
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Your Twilio WhatsApp number from .env

// Create Twilio client instance
const client = new twilio(accountSid, authToken);


// Add a new task and send WhatsApp notification using Twilio
exports.addTask = async (req, res) => {
  try {
    const { title, projectId, priority, assignedTo, dueDate, estimateTime, tags, description } = req.body;
    const attachments = req.files ? req.files.map(file => file.path) : []; // Handle file uploads

    const newTask = new Task({
      title,
      projectId,
      priority,
      assignedTo,
      dueDate,
      estimateTime,
      tags: tags.split(',').map(tag => tag.trim()), // Split and trim tags
      attachments,
      description,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    // Fetch the user to whom the task is assigned
    const user = await User.findById(assignedTo); 

    if (user) { // Ensure the user exists
      // Prepare the WhatsApp message
      const message = `Hi ${user.name}, you have been assigned a new task: ${title}.\nPriority: ${priority}\nDue Date: ${dueDate}\nDescription: ${description}`;

      // Send the message using Twilio's WhatsApp API
      client.messages
        .create({
          from: twilioWhatsAppNumber, // Twilio WhatsApp sender number
          to: `whatsapp:${user.phone}`, // Recipient's phone number in WhatsApp format
          body: message, // The message content
        })
        .then((response) => {
          // Log the API response
          res.status(201).json({ message: 'Task created and WhatsApp notification sent via Twilio', task: savedTask });
        })
        .catch((error) => {
          res.status(500).json({ message: 'Task created, but failed to send WhatsApp message via Twilio', error: error.message });
        });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other functions remain unchanged

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