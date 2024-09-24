const express = require('express');
const { getAllRoles, createRole, deleteRole } = require('../controllers/roleController');
const router = express.Router();

router.get('/', getAllRoles);
router.post('/', createRole);
router.delete('/:id', deleteRole);

module.exports = router;
