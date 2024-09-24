const Role = require('../models/Role');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  const { name, permissions, description } = req.body;
  try {
    const newRole = new Role({ name, permissions, description });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await Role.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
