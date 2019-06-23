import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import asyncValidate from './asyncValidate';

// Components
import MuiTextField from '../../components/common/form/MuiTextField';

const LoginForm = props => {
    const [state, setState] = React.useState({
        showPassword: false,
        password: ''
    });

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };
    const { classes: { form, textField, submitButton }, handleSubmit, handleFormSubmit, error, pristine, invalid } = props;
    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)} 
            className={form} 
            noValidate 
            autoComplete="off">
            <Field
                name='username'
                id="outlined-email-input"
                label="Username"
                className={textField}
                type="test"
                autoComplete='off'
                margin="normal"
                variant="outlined"
                component={MuiTextField}
            />
            <Field
                name='password'
                id="outlined-password-input"
                label="Password"
                className={textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                inputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                                {state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                component={MuiTextField}
            />
            <Button
                type='submit'
                size='large'
                color='primary'
                variant="contained"
                className={submitButton}
                disabled={(error && pristine) || invalid}
            >
                Login
                </Button>
        </form>
    );
}

export default reduxForm({
    form: 'LoginForm',
    asyncValidate,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    destroyOnUnmount: true,
})(LoginForm);
