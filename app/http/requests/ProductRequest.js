const Joi = require('joi');
const FormRequest = require('./FormRequest');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductRequest extends FormRequest {
  async rules() {
    const categories = (
      await prisma.categories.findMany({
        select: {
          id: true
        }
      })
    ).map((category) => category.id);
    return Joi.object({
      product_name: Joi.string().label('Product Name').min(1).max(100).required(),
      product_price: Joi.number().label('Product Price').min(0).required(),
      discount_price: Joi.number().allow('').label('Discount Price').min(0).optional(),
      product_description: Joi.string().allow('').label('Product Description').max(10000).optional(),
      is_featured_product: Joi.boolean().label('Is Featured Product').optional(),
      is_new_product: Joi.boolean().label('Is New Product').optional(),
      categories: Joi.array()
        .items(Joi.number().valid(...categories))
        .label('Categories')
        .optional()
    });
  }
}

module.exports = ProductRequest;
