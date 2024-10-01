// // routes/taskRoutes.js
// const express = require('express');
// const router = express.Router();
// const AssigntaskController = require('../controllers/AssigntaskController');

// // POST: Create a task
// router.post('/Assigntask', AssigntaskController.createTask);

// // GET: Fetch all Assigntask
// router.get('/Assigntask', AssigntaskController.getAssigntask);

// // GET: Fetch task by ID
// router.get('/Assigntask/:id', AssigntaskController.getTaskById);

// // PUT: Update task by ID
// router.put('/Assigntask/:id', AssigntaskController.updateTask);

// // DELETE: Delete task by ID
// router.delete('/Assigntask/:id', AssigntaskController.deleteTask);

// module.exports = router;
// routes/AssigntaskRoutes.js
const express = require('express');
const router = express.Router();
const AssigntaskController = require('../controllers/AssigntaskController');

// POST: Create a task
router.post('/Assigntask', AssigntaskController.createTask);

// GET: Fetch all tasks
router.get('/Assigntask', AssigntaskController.getTasks);  // Note: Use `getTasks` function

// GET: Fetch task by ID
router.get('/Assigntask/:id', AssigntaskController.getTaskById);

// PUT: Update task by ID
router.put('/Assigntask/:id', AssigntaskController.updateTask);

// DELETE: Delete task by ID
router.delete('/Assigntask/:id', AssigntaskController.deleteTask);

module.exports = router;
