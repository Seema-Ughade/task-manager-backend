// routes/taxRoutes.js
const express = require('express');
const {
  getTaxes,
  createTax,
  updateTax,
  deleteTax,
} = require('../controllers/taxController');

const router = express.Router();

router.get('/', getTaxes);
router.post('/', createTax);
router.put('/:id', updateTax);
router.delete('/:id', deleteTax);

module.exports = router;
