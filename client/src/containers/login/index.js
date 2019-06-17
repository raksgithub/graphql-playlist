import React from 'react';
import Typography from '@material-ui/core/Typography';

// Components
import LoginForm from './LoginForm';

// Material Styles
import { useStyles } from './useStyles';

const handleFormSubmit = values => {
    console.log('Values=>>>', values);
}

const LoginContainer = () => {
    const { container, form, textField, submitButton } = useStyles();
    return (
        <div className={container}>
            <Typography variant="h6">
                Login here
            </Typography>
            <LoginForm 
                classes={{ form, textField, submitButton }}
                handleFormSubmit={handleFormSubmit} 
            />
        </div>
    );
}

export default LoginContainer;
