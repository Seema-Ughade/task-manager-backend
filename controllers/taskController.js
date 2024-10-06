const Task = require('../models/Task'); // Assuming Task is your mongoose model
const User = require('../models/User'); // Assuming User is your mongoose model
const axios = require('axios');

// DigitalSMS API credentials
const digitalSMSApiKey = 'eae05ea5e77c9496b5fcffad4e4557f5'; // Your actual DigitalSMS API key
// const digitalSMSApiUrl = 'https://login.digitalsms.biz/api.php#step-3'; // Replace with the actual DigitalSMS API endpoint
const digitalSMSApiUrl = 'https://api.digitalsms.biz/api/send'; // Endpoint for sending messages

// Add a new task and send WhatsApp notification using DigitalSMS
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

      // Send the message using DigitalSMS API
      const response = await axios.post(digitalSMSApiUrl, null, {
        params: {
          apikey: digitalSMSApiKey, // Use 'apikey'
          mobile: user.phone, // Use 'mobile' for the phone number
          msg: message // Use 'msg' for the message body
        }
      });

      // Log the API response
      console.log('API response:', response.data);

      // Check if the message was successfully sent
      if (response.data.status === 1) {
        console.log('WhatsApp message sent successfully:', response.data); // Log success message
        res.status(201).json({ message: 'Task created and WhatsApp notification sent via DigitalSMS', task: savedTask });
      } else {
        console.error('Failed to send message:', response.data); // Log the failure response
        res.status(500).json({ message: 'Task created, but failed to send WhatsApp message via DigitalSMS', error: response.data });
      }
    } else {
      console.error('User not found for assignedTo ID:', assignedTo); // Log user not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error while sending WhatsApp message:', error.response ? error.response.data : error.message);
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

  // Log the ID to check if it's correct
  console.log("Deleting task with ID:", id);

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Delete task by ID

    if (!deletedTask) {
      console.log("Task not found for ID:", id); // Log if task was not found
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error.message); // Log server error
    res.status(500).json({ message: error.message });
  }
};
