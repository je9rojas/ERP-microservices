const purchaseService = require('../services/purchaseService');

exports.createPurchase = async (req, res, next) => {
  try {
    const purchase = await purchaseService.createPurchase(req.body);
    res.status(201).json({
      message: 'Purchase created successfully',
      data: purchase
    });
  } catch (error) {
    console.error('Error creating purchase:', error.message);
    next(error);
  }
};

exports.getPurchases = async (req, res, next) => {
  try {
    const purchases = await purchaseService.getPurchases();
    res.status(200).json({
      message: 'Purchases retrieved successfully',
      data: purchases
    });
  } catch (error) {
    console.error('Error retrieving purchases:', error.message);
    next(error);
  }
};

exports.getPurchaseById = async (req, res, next) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    
    if (!purchase) {
      return res.status(404).json({
        message: 'Purchase not found',
        error: `No purchase found with ID: ${req.params.id}`
      });
    }

    res.status(200).json({
      message: 'Purchase retrieved successfully',
      data: purchase
    });
  } catch (error) {
    console.error(`Error retrieving purchase with ID ${req.params.id}:`, error.message);
    next(error);
  }
};
