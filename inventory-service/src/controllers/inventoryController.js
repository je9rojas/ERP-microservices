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

exports.getInventoryById = async (req, res, next) => {
  try {
    const inventoryItem = await inventoryService.getInventoryById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(inventoryItem);
  } catch (err) {
    next(err);
  }
};

exports.getInventoryByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const inventoryItem = await inventoryService.getInventoryByCode(code);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(inventoryItem);
  } catch (err) {
    next(err);
  }
};

exports.addInventoryItem = async (req, res, next) => {
  try {
    // Validar los datos con Joi
    const { error } = inventorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Llamar al servicio para agregar el inventario
    const newItem = await inventoryService.addInventoryItem(req.body);
    res.status(201).json({ message: 'Inventory item added successfully', data: newItem });
  } catch (err) {
    next(err);
  }
};

exports.updateInventoryItem = async (req, res, next) => {
  try {
    // Validar los datos con Joi antes de actualizar
    const { error } = inventorySchema.validate(req.body, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item updated successfully', data: updatedItem });
  } catch (err) {
    next(err);
  }
};

exports.deleteInventoryItem = async (req, res, next) => {
  try {
    const deletedItem = await inventoryService.deleteInventoryItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.addInventoryMovement = async (req, res, next) => {
  try {
    const { productCode } = req.params;
    const movementData = req.body;

    const updatedInventory = await inventoryService.addInventoryMovement(productCode, movementData);
    res.status(200).json({ message: 'Inventory movement recorded successfully', data: updatedInventory });
  } catch (err) {
    next(err);
  }
};
