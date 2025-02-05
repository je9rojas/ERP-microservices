// models/inventoryModel.js
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Warehouse',
  },
  batchNumber: {
    type: String,
    required: false,
  },
  expiryDate: {
    type: Date,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  movements: [{
    type: {
      type: String,
      enum: ['purchase', 'sale', 'adjustment', 'transfer'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    details: {
      type: String,
      required: false,
    },
  }],
  auditLog: [{
    action: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    details: {
      type: String,
      required: false,
    },
  }],
});

module.exports = mongoose.model('Inventory', InventorySchema);