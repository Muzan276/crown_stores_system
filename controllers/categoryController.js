const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../models/categoryModel');

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const categoryId = await createCategory(categoryName, description);
    res.status(201).json({ message: 'Category created successfully', categoryId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const editCategory = async (req, res) => {
  try {
    const { categoryName, description, status } = req.body;
    const category = await getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await updateCategory(req.params.id, categoryName, description, status);
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await deleteCategory(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCategories, getCategory, addCategory, editCategory, removeCategory };