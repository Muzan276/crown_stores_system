const express = require('express');
const router = express.Router();
const {
  getDailySalesReport,
  getInventoryReport,
  getProcurementReport,
  getSummaryReport
} = require('../controllers/reportsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/daily-sales', protect, authorize('manager', 'director'), getDailySalesReport);
router.get('/inventory', protect, authorize('manager', 'director'), getInventoryReport);
router.get('/procurement', protect, authorize('manager', 'director'), getProcurementReport);
router.get('/summary', protect, authorize('director'), getSummaryReport);

module.exports = router;