const {
  createSale,
  getAllSales,
  getSaleById,
  createReceipt,
  deductStock,
  logSale
} = require('../models/salesModel');

const { getProductById } = require('../models/productModel');

const processSale = async (req, res) => {
  try {
    const { productId, quantity, amountPaid } = req.body;

    if (!productId || !quantity || !amountPaid) {
      return res.status(400).json({ message: 'Product, quantity, and amount paid are required' });
    }

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity_available < quantity) {
      return res.status(400).json({ message: 'Insufficient stock', available: product.quantity_available });
    }

    const totalPrice = product.selling_price * quantity;
    if (amountPaid < totalPrice) {
      return res.status(400).json({ message: 'Insufficient payment', totalRequired: totalPrice, amountPaid });
    }

    const change = amountPaid - totalPrice;

    const saleId = await createSale(productId, quantity, product.selling_price, amountPaid, req.user.userId);

    await deductStock(productId, quantity);

    await logSale(productId, quantity, req.user.userId);

    const receiptNumber = 'RCP-' + Date.now();
    await createReceipt(saleId, receiptNumber, 'Crown Stores Main Branch');

    res.status(201).json({
      message: 'Sale completed successfully',
      saleId,
      receiptNumber,
      productName: product.product_name,
      quantity,
      unitPrice: product.selling_price,
      totalPrice,
      amountPaid,
      change
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSale = async (req, res) => {
  try {
    const sale = await getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { processSale, getSales, getSale };