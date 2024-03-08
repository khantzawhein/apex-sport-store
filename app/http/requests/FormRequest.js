const ValidationError = require('../../exceptions/ValidationError');

class FormRequest {
  async rules() {
    return {};
  }

  async validate(data, next) {
    const { error, value } = (await this.rules()).validate(data, {
      abortEarly: false
    });
    console.log(data);
    if (error) {
      const newError = new ValidationError(error.message, error.details);
      if (next) return next(newError);
      throw newError;
    }
    return value;
  }
}

module.exports = FormRequest;
