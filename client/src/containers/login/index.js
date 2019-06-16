import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        marginLeft: theme.spacing(30),
        height: theme.spacing(40),
        width: theme.spacing(80),
        borderRadius: theme.spacing(1)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        width: '400px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2)
    }
}));


const LoginContainer = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        showPassword: false,
        password: ''
    });

    const handleChange = event => {
        setState({ ...state, password: event.target.value });
    };

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };
    return (
        <div className={classes.container}>
            <Typography variant="h6">
                Login here
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    id="outlined-email-input"
                    label="Username"
                    className={classes.textField}
                    type="test"
                    name="username"
                    autoComplete={false}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={state.password}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type='submit'
                    size='large'
                    color='primary'
                    variant="contained"
                    className={classes.submitButton}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default LoginContainer;
