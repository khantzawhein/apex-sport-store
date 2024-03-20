const Joi = require('joi');
const FormRequest = require('./FormRequest');

class EditCustomerRequest extends FormRequest {
  async rules() {
    return Joi.object({
      name: Joi.string().label('Full Name').min(3).max(30).required(),
      email: Joi.string().email().label('Email').required(),
      phone: Joi.string().label('Phone').min(8).max(15).required(),
      address: Joi.string().label('Address').min(3).required()
    });
  }
}

module.exports = EditCustomerRequest;
