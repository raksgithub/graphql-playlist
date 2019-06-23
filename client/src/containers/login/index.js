import React from 'react';
import Typography from '@material-ui/core/Typography';

// Reusable States
import useSnackbar from '../../components/hooks/useSnackbar.ts';

// Components
import LoginForm from './LoginForm';
import Snackbar from '../../components/common/Snackbar';

// Material Styles
import { useStyles } from './useStyles';

const LoginContainer = props => {
    const { container, form, textField, submitButton } = useStyles();
    
    const [state, setState] = useSnackbar('/', props.history.push);

    const handleFormSubmit = values => {
        setState({
            ...state,
            open: true,
            variant: 'success',
            message: 'Logged in successfully.'
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway' || reason === 'timeout') {
            return;
        }
        setState({ ...state, open: false });
        props.history.push('/');
    }

    return (
        <div className={container}>
            <Typography variant="h6">
                Login here
            </Typography>
            <LoginForm
                classes={{ form, textField, submitButton }}
                handleFormSubmit={handleFormSubmit}
            />
            <Snackbar
                open={state.open}
                handleClose={handleClose}
                variant={state.variant}
                message={state.message}
            />
        </div>
    );
}

export default LoginContainer;
