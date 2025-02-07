const { body } = require('express-validator');

exports.validatePurchase = [
  body('supplier')
    .trim()
    .notEmpty()
    .withMessage('Supplier is required'),

  body('invoiceNumber')
    .trim()
    .notEmpty()
    .withMessage('Invoice number is required')
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage('Invoice number must contain only letters, numbers, and hyphens'),

  body('purchaseDate')
    .isISO8601()
    .withMessage('Invalid purchase date format (must be ISO8601)')
    .custom(value => {
      if (new Date(value) > new Date()) {
        throw new Error('Purchase date cannot be in the future');
      }
      return true;
    }),

  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),

  body('items.*.productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID format'),

  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),

  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
];
