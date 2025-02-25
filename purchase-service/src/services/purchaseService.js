const Purchase = require('../models/purchaseModel');

exports.createPurchase = async (data) => {
  const totalAmount = data.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const newPurchase = new Purchase({ ...data, totalAmount });
  return await newPurchase.save();
};

exports.getPurchases = async () => {
  return await Purchase.find().populate('items.productId', 'name');
};

exports.getPurchaseById = async (id) => {
  return await Purchase.findById(id).populate('items.productId', 'name');
};
