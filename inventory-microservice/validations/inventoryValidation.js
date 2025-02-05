const Joi = require('joi');

const inventorySchema = Joi.object({
  productId: Joi.string().required(),
  warehouseId: Joi.string().required(),
  batchNumber: Joi.string().optional(),
  expiryDate: Joi.date().optional(),
  quantity: Joi.number().min(0).required(),
  location: Joi.string().required(),

  movements: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('purchase', 'sale', 'adjustment', 'transfer').required(),
      quantity: Joi.number().required(),
      userId: Joi.string().required(),
      details: Joi.string().optional(),
    })
  ).optional(),

  auditLog: Joi.array().items(
    Joi.object({
      action: Joi.string().required(),
      userId: Joi.string().required(),
      date: Joi.date().default(() => new Date()), // ✅ Corrección aquí
      details: Joi.string().optional(),
    })
  ).optional()
});

module.exports = inventorySchema;
