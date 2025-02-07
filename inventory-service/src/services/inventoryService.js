// services/inventoryService.js
const Inventory = require('../models/inventoryModel');

exports.getAllInventory = async () => {
  return await Inventory.find();
};

exports.getInventoryByCode = async (code) => {
  return await Inventory.findOne({
    $or: [
      { productCode: code },
      { "equivalents.code": code } // Buscar en equivalencias
    ]
  });
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

exports.addInventoryMovement = async (productCode, movementData) => {
  const inventoryItem = await Inventory.findOne({ productCode });
  if (!inventoryItem) throw new Error('Producto no encontrado');

  // Agregar el nuevo movimiento al inventario

  inventoryItem.movements.push(movementData);
  inventoryItem.lastUpdated = new Date();
  return await inventoryItem.save(); // Guardar el inventario actualizado
};
