import * as yup from 'yup';

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const schema = yup.object().shape({
    username: yup
        .string('Username should be text')
        .required('Username is required'),
    password: yup
        .string('Username should be text')
        .matches(passwordRegex, { message: 'Password is invalid' })
        .required('Password is required')
})

const asyncValidate = values => {
    return new Promise((resolve, reject) => {
        schema.validate(values, { abortEarly: false })
            .then(isValidated => {
                if (isValidated) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(err => {
                let errors = {};
                err.inner.forEach(e => {
                    const key = e.path;
                    const value = e.message;
                    errors[key] = value;
                })
                reject(errors);
            });
    });
}

export default asyncValidate;