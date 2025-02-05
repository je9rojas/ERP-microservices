const Joi = require('joi');

const inventorySchema = Joi.object({
  productId: Joi.string().required(),
  warehouseId: Joi.string().required(),
  batchNumber: Joi.string().required(),
  purchaseDate: Joi.date().required(),
  purchasePrice: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  location: Joi.string().required(),
  equivalents: Joi.array().items(
    Joi.object({
      brand: Joi.string().required(),
      code: Joi.string().required(),
    })
  ),
  movements: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('purchase', 'sale', 'adjustment', 'transfer').required(),
      quantity: Joi.number().required(),
      userId: Joi.string().required(),
      details: Joi.string().optional(),
    })
  ),
  auditLog: Joi.array().items(
    Joi.object({
      action: Joi.string().required(),
      userId: Joi.string().required(),
      details: Joi.string().optional(),
    })
  ),
});

module.exports = inventorySchema;
