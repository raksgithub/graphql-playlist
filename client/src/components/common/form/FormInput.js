import React from 'react';

const FormInput = props => {
    const { 
        input, 
        label, 
        type, 
        placeholder, 
        autoComplete,
        meta: { touched, dirty, error, warning } 
    } = props;
    return (
        <div>
            <div className="form-group">
                <label>{label}</label>
                <input
                    { ...input }
                    type={type}
                    className="form-control"
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
            </div>
            {(touched || dirty) && error && (
                <span>{error}</span>
            )}
            {(touched || dirty) && warning && (
                <span>{warning}</span>
            )}
        </div>
    );
}

export default FormInput;
