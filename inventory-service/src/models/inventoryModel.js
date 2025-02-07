const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productCode: { // Código físico del producto en inventario
    type: String,
    required: true,
    unique: true, // Asegura que no se repita en otro lote
  },
  productId: { // ID del producto en la base de datos de productos
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  warehouseId: { // ID del almacén donde se encuentra
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Warehouse',
  },
  batchNumber: { // Lote de compra del filtro
    type: String,
    required: true,
  },
  purchaseDate: { // Fecha en la que se compró este lote
    type: Date,
    required: true,
  },
  purchasePrice: { // Precio de compra del filtro en este lote
    type: Number,
    required: true,
    min: 0,
  },
  salePrice: { // Precio de venta sugerido o establecido
    type: Number,
    required: true,
    min: 0,
  },
  quantity: { // Cantidad de filtros disponibles en este lote
    type: Number,
    required: true,
    min: 0,
  },
  location: { // Ubicación física dentro del almacén
    type: String,
    required: true,
  },
  equivalents: [{ // Lista de códigos equivalentes
    brand: { type: String, required: true }, // Marca del filtro equivalente (ej: FILTRON, WIX)
    code: { type: String, required: true } // Código del filtro en esa marca
  }],
  lastUpdated: { // Fecha de última actualización del inventario
    type: Date,
    default: Date.now,
  },
  movements: [{ // Movimientos de inventario
    type: {
      type: String,
      enum: ['purchase', 'sale', 'adjustment', 'transfer'],
      required: true,
    },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    details: { type: String },
  }],
  auditLog: [{ // Registro de auditoría
    action: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now },
    details: { type: String },
  }],
});

module.exports = mongoose.model('Inventory', InventorySchema, 'inventories');
