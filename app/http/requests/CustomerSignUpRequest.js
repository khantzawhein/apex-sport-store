const Joi = require('joi');
const FormRequest = require('./FormRequest');

class CustomerSignUpRequest extends FormRequest {
  async rules() {
    return Joi.object({
      full_name: Joi.string().label('Full Name').min(3).max(30).required(),
      email: Joi.string().email().label('Email').required(),
      password: Joi.string().min(6).required().label('Password'),
      confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password and Confirm Password must match.'
      }),
      phone: Joi.string().label('Phone').min(8).max(15).required(),
      address: Joi.string().label('Address').min(3).required()
    });
  }
}

module.exports = CustomerSignUpRequest;
