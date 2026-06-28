const {
  getDailySalesReport,
  getInventoryReport,
  getProcurementReport,
  getSummaryReport,
  getAdvancedDashboard
} = require('../controllers/reportsController');
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/daily-sales', protect, authorize('manager', 'director'), getDailySalesReport);
router.get('/inventory', protect, authorize('manager', 'director'), getInventoryReport);
router.get('/procurement', protect, authorize('manager', 'director'), getProcurementReport);
router.get('/summary', protect, authorize('director'), getSummaryReport);

module.exports = router;
router.get('/advanced-dashboard', protect, authorize('director'), getAdvancedDashboard);