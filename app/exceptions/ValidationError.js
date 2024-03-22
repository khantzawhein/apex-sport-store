class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.details = details;
  }

  render(req, res) {
    if (req.xhr) {
      return res.status(422).json({ message: this.message, errors: this.details });
    }
    req.session.validation_error = { message: this.message, errors: this.details };
    req.session.save(() => res.redirect(req.session.last_url || '/'));
  }
}


module.exports = ValidationError;