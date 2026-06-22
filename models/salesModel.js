const db = require('../config/db');

const createSale = async (productId, quantity, unitPrice, amountPaid, salesAgentId) => {
  const query = 'INSERT INTO sales (product_id, quantity, unit_price, amount_paid, sales_agent_id) VALUES (?, ?, ?, ?, ?)';
  const [result] = await db.query(query, [productId, quantity, unitPrice, amountPaid, salesAgentId]);
  return result.insertId;
};

const getAllSales = async () => {
  const query = 'SELECT s.*, p.product_name, u.full_name as agent_name FROM sales s JOIN products p ON s.product_id = p.product_id JOIN users u ON s.sales_agent_id = u.user_id ORDER BY s.sale_date DESC';
  const [rows] = await db.query(query);
  return rows;
};

const getSaleById = async (id) => {
  const query = 'SELECT s.*, p.product_name, u.full_name as agent_name FROM sales s JOIN products p ON s.product_id = p.product_id JOIN users u ON s.sales_agent_id = u.user_id WHERE s.sale_id = ?';
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

const createReceipt = async (saleId, receiptNumber, branchName) => {
  const query = 'INSERT INTO receipts (sale_id, receipt_number, branch_name) VALUES (?, ?, ?)';
  await db.query(query, [saleId, receiptNumber, branchName]);
};

const deductStock = async (productId, quantity) => {
  const query = 'UPDATE products SET quantity_available = quantity_available - ? WHERE product_id = ?';
  await db.query(query, [quantity, productId]);
};

const logSale = async (productId, quantity, createdBy) => {
  const query = 'INSERT INTO inventory_logs (product_id, change_type, quantity_change, reason, created_by) VALUES (?, ?, ?, ?, ?)';
  await db.query(query, [productId, 'sale', -quantity, 'Sale transaction', createdBy]);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  createReceipt,
  deductStock,
  logSale
};