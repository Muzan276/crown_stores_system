const express = require('express');
const router = express.Router();
const { processSale, getSales, getSale } = require('../controllers/salesController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('sales_agent', 'manager'), processSale);
router.get('/', protect, authorize('manager', 'director'), getSales);
router.get('/:id', protect, authorize('manager', 'director'), getSale);

module.exports = router;