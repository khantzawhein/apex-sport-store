const Joi = require('joi');
const FormRequest = require('./FormRequest');

class ContactUsRequest extends FormRequest {
  async rules() {
    return Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      message: Joi.string().required()
    });
  }
}

module.exports = ContactUsRequest;
