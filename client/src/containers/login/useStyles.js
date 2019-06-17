import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        marginLeft: theme.spacing(30),
        marginTop: theme.spacing(15),
        height: theme.spacing(40),
        width: theme.spacing(70),
        borderRadius: theme.spacing(1)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        width: theme.spacing(40),
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

export { useStyles };