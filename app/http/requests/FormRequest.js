const ValidationError = require('../../exceptions/ValidationError');

class FormRequest {
  rules() {
    return {};
  }

  validate(data, next) {
    const { error, value } = this.rules().validate(data, {
      abortEarly: false
    });
    if (error) {
      const newError = new ValidationError(error.message, error.details);
      if (next) return next(newError);
      throw newError;
    }
    return value;
  }
}

module.exports = FormRequest;