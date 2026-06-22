const db = require('../config/db');

const getAllProducts = async () => {
  const query = 'SELECT p.*, c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id';
  const [rows] = await db.query(query);
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [id]);
  return rows[0];
};

const createProduct = async (categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel) => {
  const query = 'INSERT INTO products (category_id, product_name, description, cost_price, selling_price, quantity_available, reorder_level) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.query(query, [categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel]);
  return result.insertId;
};

const updateProduct = async (id, categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel, status) => {
  const query = 'UPDATE products SET category_id = ?, product_name = ?, description = ?, cost_price = ?, selling_price = ?, quantity_available = ?, reorder_level = ?, status = ? WHERE product_id = ?';
  await db.query(query, [categoryId, productName, description, costPrice, sellingPrice, quantityAvailable, reorderLevel, status, id]);
};

const deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE product_id = ?', [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};