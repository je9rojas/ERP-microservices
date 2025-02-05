// services/inventoryService.js
const Inventory = require('../models/inventoryModel');

exports.getAllInventory = async () => {
  return await Inventory.find();
};

exports.addInventoryItem = async (data) => {
  const inventoryItem = new Inventory(data);
  return await inventoryItem.save();
};

exports.updateInventoryItem = async (id, data) => {
  return await Inventory.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteInventoryItem = async (id) => {
  return await Inventory.findByIdAndDelete(id);
};