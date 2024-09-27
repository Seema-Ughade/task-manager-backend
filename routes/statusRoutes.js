const express = require('express');
const {
  getAllStatuses,
  createStatus,
  updateStatus,
  deleteStatus,
} = require('../controllers/statusController');

const router = express.Router();

router.get('/', getAllStatuses);
router.post('/', createStatus);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);

module.exports = router;
