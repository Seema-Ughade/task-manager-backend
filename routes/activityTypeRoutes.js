// routes/activityTypeRoutes.js

const express = require('express');
const {
  getAllActivityTypes,
  createActivityType,
  updateActivityType,
  deleteActivityType,
} = require('../controllers/activityTypeController');

const router = express.Router();

router.get('/', getAllActivityTypes);
router.post('/', createActivityType);
router.put('/:id', updateActivityType);
router.delete('/:id', deleteActivityType);

module.exports = router;
