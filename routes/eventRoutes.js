// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getAllEvents);

// Update an event
router.put('/:id', updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;
