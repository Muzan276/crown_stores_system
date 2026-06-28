const db = require('../config/db');

const getDailySalesReport = async (req, res) => {
  try {
    const query = 'SELECT s.sale_id, s.quantity, s.unit_price, s.amount_paid, s.sale_date, p.product_name, u.full_name as agent_name FROM sales s JOIN products p ON s.product_id = p.product_id JOIN users u ON s.sales_agent_id = u.user_id WHERE DATE(s.sale_date) = CURDATE() ORDER BY s.sale_date DESC';
    const [sales] = await db.query(query);

    const totalQuery = 'SELECT COUNT(*) as totalTransactions, SUM(unit_price * quantity) as totalRevenue FROM sales WHERE DATE(sale_date) = CURDATE()';
    const [totals] = await db.query(totalQuery);

    res.status(200).json({
      date: new Date().toISOString().split('T')[0],
      totalTransactions: totals[0].totalTransactions,
      totalRevenue: totals[0].totalRevenue || 0,
      sales
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getInventoryReport = async (req, res) => {
  try {
    const query = 'SELECT p.product_id, p.product_name, p.quantity_available, p.reorder_level, p.cost_price, p.selling_price, p.status, c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id ORDER BY p.quantity_available ASC';
    const [products] = await db.query(query);

    const lowStockQuery = 'SELECT COUNT(*) as lowStockCount FROM products WHERE quantity_available <= reorder_level';
    const [lowStock] = await db.query(lowStockQuery);

    res.status(200).json({
      totalProducts: products.length,
      lowStockCount: lowStock[0].lowStockCount,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProcurementReport = async (req, res) => {
  try {
    const query = 'SELECT pr.*, p.product_name FROM procurements pr JOIN products p ON pr.product_id = p.product_id ORDER BY pr.date_received DESC';
    const [procurements] = await db.query(query);

    const totalQuery = 'SELECT COUNT(*) as totalOrders, SUM(quantity_received * cost_price) as totalCost FROM procurements';
    const [totals] = await db.query(totalQuery);

    res.status(200).json({
      totalOrders: totals[0].totalOrders,
      totalCost: totals[0].totalCost || 0,
      procurements
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSummaryReport = async (req, res) => {
  try {
    const salesQuery = 'SELECT COUNT(*) as totalSales, SUM(unit_price * quantity) as totalRevenue FROM sales';
    const [sales] = await db.query(salesQuery);

    const productsQuery = 'SELECT COUNT(*) as totalProducts FROM products WHERE status = "active"';
    const [products] = await db.query(productsQuery);

    const lowStockQuery = 'SELECT COUNT(*) as lowStockCount FROM products WHERE quantity_available <= reorder_level';
    const [lowStock] = await db.query(lowStockQuery);

    const procurementQuery = 'SELECT COUNT(*) as totalProcurements, SUM(quantity_received * cost_price) as totalCost FROM procurements';
    const [procurement] = await db.query(procurementQuery);

    res.status(200).json({
      totalSales: sales[0].totalSales,
      totalRevenue: sales[0].totalRevenue || 0,
      totalProducts: products[0].totalProducts,
      lowStockCount: lowStock[0].lowStockCount,
      totalProcurements: procurement[0].totalProcurements,
      totalProcurementCost: procurement[0].totalCost || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAdvancedDashboard = async (req, res) => {
  try {
    const todaySalesQuery = 'SELECT COUNT(*) as totalTransactions, SUM(unit_price * quantity) as totalRevenue, SUM((unit_price - cost_price) * quantity) as totalProfit FROM sales s JOIN products p ON s.product_id = p.product_id WHERE DATE(s.sale_date) = CURDATE()';
    const [todaySales] = await db.query(todaySalesQuery);

    const topProductsQuery = 'SELECT p.product_name, SUM(s.quantity) as totalSold, SUM(s.unit_price * s.quantity) as totalRevenue FROM sales s JOIN products p ON s.product_id = p.product_id GROUP BY s.product_id, p.product_name ORDER BY totalSold DESC LIMIT 5';
    const [topProducts] = await db.query(topProductsQuery);

    const lowStockQuery = 'SELECT product_name, quantity_available, reorder_level FROM products WHERE quantity_available <= reorder_level ORDER BY quantity_available ASC';
    const [lowStock] = await db.query(lowStockQuery);

    const recentSalesQuery = 'SELECT s.sale_date, p.product_name, s.quantity, s.unit_price, s.amount_paid, u.full_name as agent_name FROM sales s JOIN products p ON s.product_id = p.product_id JOIN users u ON s.sales_agent_id = u.user_id ORDER BY s.sale_date DESC LIMIT 5';
    const [recentSales] = await db.query(recentSalesQuery);

    res.status(200).json({
      today: {
        totalTransactions: todaySales[0].totalTransactions || 0,
        totalRevenue: todaySales[0].totalRevenue || 0,
        totalProfit: todaySales[0].totalProfit || 0
      },
      topProducts,
      lowStock,
      recentSales
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { getDailySalesReport, getInventoryReport, getProcurementReport, getSummaryReport, getAdvancedDashboard };