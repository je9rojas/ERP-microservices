// routes/inventoryRoutes.js
const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

// Obtener todos los registros del inventario
router.get('/', async (req, res, next) => {
  try {
    await inventoryController.getAllInventory(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Obtener un ítem de inventario por ID
router.get('/:id', async (req, res, next) => {
  try {
    await inventoryController.getInventoryById(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Obtener un ítem de inventario por código de producto (incluyendo equivalencias)
router.get('/code/:code', async (req, res, next) => {
  try {
    await inventoryController.getInventoryByCode(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Agregar un nuevo ítem al inventario
router.post('/', async (req, res, next) => {
  try {
    await inventoryController.addInventoryItem(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Actualizar un ítem de inventario existente
router.put('/:id', async (req, res, next) => {
  try {
    await inventoryController.updateInventoryItem(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Eliminar un ítem de inventario
router.delete('/:id', async (req, res, next) => {
  try {
    await inventoryController.deleteInventoryItem(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Registrar un movimiento de inventario (compra, venta, ajuste, transferencia)
router.post('/movement/:productCode', async (req, res, next) => {
  try {
    await inventoryController.addInventoryMovement(req, res, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
