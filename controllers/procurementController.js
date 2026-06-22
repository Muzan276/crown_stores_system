const {
  getAllProcurements,
  createProcurement,
  updateProductStock,
  logInventoryChange
} = require('../models/procurementModel');

const getProcurements = async (req, res) => {
  try {
    const procurements = await getAllProcurements();
    res.status(200).json(procurements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addProcurement = async (req, res) => {
  try {
    const { productId, supplierName, quantityReceived, costPrice, branch } = req.body;

    if (!productId || !supplierName || !quantityReceived || !costPrice) {
      return res.status(400).json({ message: 'Product, supplier name, quantity received, and cost price are required' });
    }

    const procurementId = await createProcurement(productId, supplierName, quantityReceived, costPrice, branch);

    await updateProductStock(productId, quantityReceived);

    await logInventoryChange(productId, quantityReceived, 'Stock received from supplier', req.user.userId);

    res.status(201).json({ message: 'Procurement recorded and stock updated successfully', procurementId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProcurements, addProcurement };