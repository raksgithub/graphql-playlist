const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    username: Joi
        .string()
        .alphanum('username should be alphanumeric')
        .min(3)
        .max(30)
        .required('Username is required.'),
    password: Joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required('Password is required.')
});

module.exports = schema;