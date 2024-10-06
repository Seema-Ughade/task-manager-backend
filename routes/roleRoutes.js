const express = require('express');
const { getAllRoles, createRole, deleteRole,getRoleById, editRole } = require('../controllers/roleController');
const router = express.Router();

router.get('/', getAllRoles);
router.post('/', createRole);
router.delete('/:id', deleteRole);
router.put('/:id', editRole); // Route for editing a role
router.get('/:id', getRoleById); // Get role by ID

module.exports = router;
