const express = require('express');
const router = express.Router();
const { getProcurements, addProcurement } = require('../controllers/procurementController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getProcurements);
router.post('/', protect, authorize('manager'), addProcurement);

module.exports = router;