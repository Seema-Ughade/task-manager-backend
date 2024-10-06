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

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id); // Get role by ID from the database
    if (!role) {
      return res.status(404).json({ message: 'Role not found' }); // Return 404 if role doesn't exist
    }
    res.status(200).json(role); // Return the role data
  } catch (error) {
    res.status(500).json({ message: 'Server error', error }); // Return 500 for any server error
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



exports.editRole = async (req, res) => {
  const { id } = req.params;
  const { name, permissions, description } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, permissions, description },
      { new: true, runValidators: true } // This returns the updated document and runs validation
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' }); // Return 404 if the role is not found
    }

    res.status(200).json(updatedRole); // Return the updated role
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error }); // Return 400 for validation or other errors
  }
};
