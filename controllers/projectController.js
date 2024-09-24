const Project = require('../models/Project');

// Fetch all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  try {
    const { name, prefix, client, color, users } = req.body;

    const newProject = new Project({
      name,
      prefix,
      client,
      color,
      users,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add project' });
  }
};

// Delete a project
// Delete a project
// Delete a project
exports.deleteProject = async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  };
    // Edit a project
exports.editProject = async (req, res) => {
    try {
      const { name, prefix, client, color, users } = req.body;
      const projectId = req.params.id;
  
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { name, prefix, client, color, users },
        { new: true } // Return the updated document
      );
  
      if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
      
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  };
  