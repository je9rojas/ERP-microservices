const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  supplierId: { // ID del proveedor
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Supplier',
  },
  purchaseDate: { // Fecha de compra
    type: Date,
    required: true,
    default: Date.now,
  },
  totalAmount: { // Monto total de la compra
    type: Number,
    required: true,
    min: 0,
  },
  status: { // Estado de la compra
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: { // Estado del pago
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid',
  },
  paymentMethod: { // Método de pago
    type: String,
    enum: ['cash', 'credit', 'transfer', 'other'],
  },
  invoiceNumber: { // Número de factura
    type: String,
    unique: true,
  },
  receivedBy: { // Usuario que recibió la compra
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [{ // Lista de productos comprados
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // Producto comprado
    quantity: { type: Number, required: true, min: 1 }, // Cantidad comprada
    unitPrice: { type: Number, required: true, min: 0 }, // Precio unitario del producto
    batchNumber: { type: String, required: true }, // Número de lote del producto
    warehouseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Warehouse' }, // Almacén de destino
  }],
  notes: { // Notas adicionales
    type: String,
  },
  auditLog: [{ // Registro de auditoría
    action: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now },
    details: { type: String },
  }],
});

module.exports = mongoose.model('Purchase', PurchaseSchema, 'purchases');
