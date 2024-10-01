// controllers/tagController.js
const Tag = require('../models/Tag');

// Get all tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

// Create a new tag
exports.createTag = async (req, res) => {
  try {
    const newTag = new Tag(req.body);
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag', error });
  }
};

// Update an existing tag
exports.updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tag', error });
  }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    await Tag.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag', error });
  }
};
