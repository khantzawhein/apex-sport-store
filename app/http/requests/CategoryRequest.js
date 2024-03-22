const Joi = require('joi');
const FormRequest = require('./FormRequest');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryRequest extends FormRequest {
  async rules() {
    const categoryTypes = await prisma.category_Types.findMany();
    return Joi.object({
      categoryName: Joi.string().label('Category Name').min(1).max(30).required(),
      category_type: Joi.number()
        .valid(...categoryTypes.map((type) => type.id))
        .label('Category Type')
        .required()
    });
  }
}

module.exports = CategoryRequest;
