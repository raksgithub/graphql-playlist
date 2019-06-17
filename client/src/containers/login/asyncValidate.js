import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string('Username should be text').required('Its a required field'),
    password: yup.string('Username should be text').required('Its a required field')
})

const asyncValidate = values => {
    return new Promise((resolve, reject) => {
        schema.validate(values)
        .then(isValidated => {
            if(isValidated) {
                resolve();
            } else {
                reject();
            }
        })
        .catch(err => {
            console.log('Error=>>>', err);
            reject(err.errors[0]);
        });
    });
}

export default asyncValidate;