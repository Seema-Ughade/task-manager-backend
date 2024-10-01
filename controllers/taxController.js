// controllers/taxController.js
const Tax = require('../models/Tax');

// Get all taxes
exports.getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json(taxes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching taxes', error });
  }
};

// Create a new tax
exports.createTax = async (req, res) => {
  const { name, rate } = req.body;
  const tax = new Tax({ name, rate });

  try {
    const savedTax = await tax.save();
    res.status(201).json(savedTax);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tax', error });
  }
};

// Update an existing tax
exports.updateTax = async (req, res) => {
  const { id } = req.params;
  const { name, rate } = req.body;

  try {
    const updatedTax = await Tax.findByIdAndUpdate(id, { name, rate }, { new: true });
    if (!updatedTax) return res.status(404).json({ message: 'Tax not found' });
    res.json(updatedTax);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tax', error });
  }
};

// Delete a tax
exports.deleteTax = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTax = await Tax.findByIdAndDelete(id);
    if (!deletedTax) return res.status(404).json({ message: 'Tax not found' });
    res.json({ message: 'Tax deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tax', error });
  }
};
