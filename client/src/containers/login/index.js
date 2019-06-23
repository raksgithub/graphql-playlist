import React from 'react';
import Typography from '@material-ui/core/Typography';
import { graphql, compose } from 'react-apollo';
import { get as _get } from 'lodash';
import { connect } from 'react-redux';
import { signIn } from '../../actions/signIn';

// GQL Mutation
import { loginMutation } from '../../graphql/mutations/login';

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

    const handleFormSubmit = async ({ username, password }) => {
        const { loginMutation, signIn } = props;
        const response = await loginMutation({
            variables: {
                username,
                password
            }
        });
        const { status, message, token } = _get(response, 'data.signInUser');
        if(token) {
            setState({
                ...state,
                open: true,
                variant: 'success',
                message: 'Logged in successfully.'
            });
            signIn(token);
        } else {
            setState({
                ...state,
                open: true,
                variant: status == 404 ? 'error' : 'warning',
                message
            });
        }
        console.log('Response=>>>>', response);
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

const mapDispatchToProps = dispatch => ({
    signIn: token => dispatch(signIn(token))
});

export default compose(
    graphql(loginMutation, { name: 'loginMutation' }),
    connect(null, mapDispatchToProps)
)(LoginContainer);
