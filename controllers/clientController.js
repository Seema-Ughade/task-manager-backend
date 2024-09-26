const Client = require('../models/clientModel');
const cloudinary = require('../middlewares/cloudinaryConfig');

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

// Get all departments (example implementation)
const getDepartments = async (req, res) => {
  const departments = [
    { name: 'Marketing' },
    { name: 'Development' },
    { name: 'Design' },
  ];
  res.json(departments);
};

// Create a new client
const createClient = async (req, res) => {
  try {
    const { name, department, email, website } = req.body;

    let profileImageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    const newClient = new Client({
      name,
      department,
      email,
      website,
      profileImage: profileImageUrl,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding client' });
  }
};

// Update a client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email, website } = req.body;

    let profileImageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        name,
        department,
        email,
        website,
        profileImage: profileImageUrl,
      },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating client' });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting client' });
  }
};

module.exports = {
  getClients,
  getDepartments,
  createClient,
  updateClient,
  deleteClient,
};
