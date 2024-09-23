// clientController.js
const Client = require('../models/clientModel');
const cloudinary = require('../middlewares/cloudinaryConfig');

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

const getDepartments = async (req, res) => {
  // Example departments; replace with your logic
  const departments = [{ name: 'Marketing' }, { name: 'Development' }, { name: 'Design' }];
  res.json(departments);
};

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

module.exports = {
  getClients,
  getDepartments,
  createClient,
};
