const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.post('/', protect, authorize('manager'), addProduct);
router.put('/:id', protect, authorize('manager'), editProduct);
router.delete('/:id', protect, authorize('manager'), removeProduct);

module.exports = router;