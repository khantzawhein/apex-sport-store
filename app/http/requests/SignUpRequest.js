const Joi = require('joi');
const ValidationError = require('../../exceptions/ValidationError');

const schema = Joi.object({
    name: Joi.string().alphanum().label('Name')
        .min(3)
        .max(30)
        .required(),
    username: Joi.string().label('Username')
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().min(6).required().label('Password'),

    confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password and Confirm Password must match.'
    }),

    // email: Joi.string()
    //     .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
})

function validate(data, next) {
    const {error, value} = schema.validate(data, {
        abortEarly: false
    });
    if (error) {
        const newError = new ValidationError(error.message, error.details);
        if (next) return next(newError);
        throw newError;
    }
    return value;
}
module.exports = {schema, validate};
