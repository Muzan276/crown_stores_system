const db = require('../config/db');

const getAllCategories = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);
  return rows[0];
};

const createCategory = async (categoryName, description) => {
  const [result] = await db.query(
    'INSERT INTO categories (category_name, description) VALUES (?, ?)',
    [categoryName, description]
  );
  return result.insertId;
};

const updateCategory = async (id, categoryName, description, status) => {
  await db.query(
    'UPDATE categories SET category_name = ?, description = ?, status = ? WHERE category_id = ?',
    [categoryName, description, status, id]
  );
};

const deleteCategory = async (id) => {
  await db.query('DELETE FROM categories WHERE category_id = ?', [id]);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};