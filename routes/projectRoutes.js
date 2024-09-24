const express = require('express');
const { getProjects, addProject, deleteProject } = require('../controllers/projectController');
const router = express.Router();

// Route to get all projects
router.get('/projects', getProjects);

// Route to add a new project
router.post('/projects', addProject);

// Route to delete a project by ID
router.delete('/projects/:id', deleteProject);

module.exports = router;
