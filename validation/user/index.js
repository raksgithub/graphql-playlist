const Joi = require('@hapi/joi');
const schema = require('./schema');

const validateUser = async values => {
    try {
        const isValidated = await Joi.validate(values, schema);
        if(isValidated) {
            console.log('User is validated Successfully.', isValidated);
            return isValidated;
        } else {
            console.log('User is not validated.', isValidated);
        }
    }
    catch(err) {
        console.log('Error has occured while validating User', err);
    }
}

module.exports = validateUser;