const purchaseService = require('../services/purchaseService');

exports.createPurchase = async (req, res, next) => {
  try {
    const purchase = await purchaseService.createPurchase(req.body);
    res.status(201).json(purchase);
  } catch (error) {
    next(error);
  }
};

exports.getPurchases = async (req, res, next) => {
  try {
    const purchases = await purchaseService.getPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
};

exports.getPurchaseById = async (req, res, next) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    next(error);
  }
};
