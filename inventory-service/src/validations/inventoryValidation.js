const Joi = require('joi');

const inventorySchema = Joi.object({
  productCode: Joi.string().required(), // <-- Agregar esta línea
  productId: Joi.string().required(), // ID del filtro (producto físico)
  warehouseId: Joi.string().required(), // ID del almacén donde se encuentra
  batchNumber: Joi.string().required(), // Lote de compra del filtro
  purchaseDate: Joi.date().required(), // Fecha de compra del lote
  purchasePrice: Joi.number().min(0).required(), // Precio de compra
  salePrice: Joi.number().min(0).required(), // Precio de venta
  quantity: Joi.number().min(0).required(), // Cantidad disponible
  location: Joi.string().required(), // Ubicación dentro del almacén
  equivalents: Joi.array().items(
    Joi.object({
      brand: Joi.string().required(), // Marca del filtro equivalente
      code: Joi.string().required(), // Código del filtro equivalente
    })
  ).optional(), // La lista de equivalencias es opcional, ya que puede no tener equivalentes
  movements: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('purchase', 'sale', 'adjustment', 'transfer').required(), // Tipo de movimiento
      quantity: Joi.number().required(), // Cantidad involucrada en el movimiento
      userId: Joi.string().required(), // ID del usuario que realiza el movimiento
      details: Joi.string().optional(), // Detalles del movimiento (opcional)
    })
  ).optional(), // Los movimientos son opcionales
  auditLog: Joi.array().items(
    Joi.object({
      action: Joi.string().required(), // Acción realizada en el inventario (ej. "update", "delete")
      userId: Joi.string().required(), // ID del usuario que realizó la acción
      details: Joi.string().optional(), // Detalles de la acción (opcional)
    })
  ).optional(), // El registro de auditoría es opcional
});

module.exports = inventorySchema;
