// routes/inventoryRoutes.js
const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.addInventoryItem);
router.put('/:id', inventoryController.updateInventoryItem);
router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;