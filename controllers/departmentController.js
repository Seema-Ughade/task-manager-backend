// controllers/departmentController.js
const Department = require('../models/Department');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name, color, description } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const newDepartment = new Department({
      name,
      color,
      description,
    });

    await newDepartment.save();
    res.status(201).json({ message: 'Department created successfully', department: newDepartment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 }); // Fetch departments sorted by creation time
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Optional: Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    await Department.findByIdAndDelete(departmentId);
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    const { name, color, description } = req.body;
    const { id } = req.params;
    try {
      const department = await Department.findById(id);
      if (!department) return res.status(404).json({ error: 'Department not found' });
  
      department.name = name;
      department.color = color;
      department.description = description;
      await department.save();
      res.json(department);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update department' });
    }
  };
  