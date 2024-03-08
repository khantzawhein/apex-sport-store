const Joi = require('joi');
const FormRequest = require('./FormRequest');

class SignUpRequest extends FormRequest {
  async rules() {
    return Joi.object({
      name: Joi.string().label('Name').min(3).max(30).required(),
      username: Joi.string().label('Username').alphanum().min(3).max(30).required(),
      email: Joi.string().email().label('Email').required(),
      password: Joi.string().min(6).required().label('Password'),

      confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password and Confirm Password must match.'
      })
    });
  }
}

module.exports = SignUpRequest;
