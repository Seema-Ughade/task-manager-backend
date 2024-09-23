// routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Route to create a new department
router.post('/departments', departmentController.createDepartment);

// Route to get all departments
router.get('/departments', departmentController.getAllDepartments);

// Optional: Route to delete a department by ID
router.delete('/departments/:id', departmentController.deleteDepartment);

router.put('/departments/:id', departmentController.updateDepartment);


module.exports = router;
