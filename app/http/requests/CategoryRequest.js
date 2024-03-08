const Joi = require('joi');
const FormRequest = require('./FormRequest');

class CategoryRequest extends FormRequest {
  async rules() {
    return Joi.object({
      categoryName: Joi.string().alphanum().label('Category Name').min(1).max(30).required()
    });
  }
}

module.exports = CategoryRequest;
