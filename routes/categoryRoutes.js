const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getCategories);
router.get('/:id', protect, getCategory);
router.post('/', protect, authorize('manager'), addCategory);
router.put('/:id', protect, authorize('manager'), editCategory);
router.delete('/:id', protect, authorize('manager'), removeCategory);

module.exports = router;