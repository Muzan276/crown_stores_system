const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel } = req.body;

    if (!categoryId || !productName || !costPrice || !sellingPrice) {
      return res.status(400).json({ message: 'Category, product name, cost price, and selling price are required' });
    }

    const productId = await createProduct(categoryId, productName, description, costPrice, sellingPrice, quantityAvailable || 0, reorderLevel || 0);
    res.status(201).json({ message: 'Product created successfully', productId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel, status } = req.body;
    await updateProduct(req.params.id, categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel, status);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProducts, getProduct, addProduct, editProduct, removeProduct };