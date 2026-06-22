const db = require('../config/db');

const getAllProcurements = async () => {
  const query = 'SELECT pr.*, p.product_name FROM procurements pr JOIN products p ON pr.product_id = p.product_id ORDER BY pr.date_received DESC';
  const [rows] = await db.query(query);
  return rows;
};

const createProcurement = async (productId, supplierName, quantityReceived, costPrice, branch) => {
  const query = 'INSERT INTO procurements (product_id, supplier_name, quantity_received, cost_price, branch) VALUES (?, ?, ?, ?, ?)';
  const [result] = await db.query(query, [productId, supplierName, quantityReceived, costPrice, branch]);
  return result.insertId;
};

const updateProductStock = async (productId, quantityReceived) => {
  const query = 'UPDATE products SET quantity_available = quantity_available + ? WHERE product_id = ?';
  await db.query(query, [quantityReceived, productId]);
};

const logInventoryChange = async (productId, quantityChange, reason, createdBy) => {
  const query = 'INSERT INTO inventory_logs (product_id, change_type, quantity_change, reason, created_by) VALUES (?, ?, ?, ?, ?)';
  await db.query(query, [productId, 'procurement', quantityChange, reason, createdBy]);
};

module.exports = {
  getAllProcurements,
  createProcurement,
  updateProductStock,
  logInventoryChange
};