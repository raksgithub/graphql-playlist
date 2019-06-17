import React from 'react';
import TextField from '@material-ui/core/TextField';

const MuiTextField = props => {
    const {
        id,
        label,
        className,
        type,
        input,
        meta: { touched, dirty, error, warning },
        autoComplete,
        margin,
        variant,
        inputProps = {}
    } = props;
    return (
        <div>
            <TextField
                { ...input }
                id={id}
                label={label}
                className={className}
                type={type}
                autoComplete={autoComplete}
                margin={margin}
                variant={variant}
                InputProps={inputProps}
            />
            {(touched || dirty) && error && (
                <div>{error}</div>
            )}
            {(touched || dirty) && warning && (
                <div>{warning}</div>
            )}
        </div>
    );
}

export default MuiTextField;
