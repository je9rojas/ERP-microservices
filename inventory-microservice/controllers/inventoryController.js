// controllers/inventoryController.js
const inventoryService = require('../services/inventoryService');
const inventorySchema = require('../validations/inventoryValidation');

exports.getAllInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryService.getAllInventory();
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.addInventoryItem = async (req, res, next) => {
  try {
    const { error } = inventorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newItem = await inventoryService.addInventoryItem(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

exports.updateInventoryItem = async (req, res, next) => {
  try {
    const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body);
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
};

exports.deleteInventoryItem = async (req, res, next) => {
  try {
    await inventoryService.deleteInventoryItem(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};
