const Joi = require('@hapi/joi');

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const schema = Joi.object().keys({
    username: Joi
        .string()
        .alphanum('username should be alphanumeric')
        .min(3)
        .max(30)
        .required('Username is required.'),
    password: Joi
        .string()
        .regex(passwordRegEx)
        .required('Password is required.')
});

module.exports = schema;