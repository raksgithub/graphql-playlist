import React from 'react';

const renderOptions = optionData => {
    return optionData.map(option => (
        <option key={option.id} value={option.id}>
                {option.name}
        </option>
    ));
}

const FormSelect = props => {
    const {
        input, 
        label, 
        data, 
        firstOptionName, 
        meta: { touched, dirty, error, warning } 
    } = props;
    return (
        <div>
            <div className="form-group">
                <label>{label}</label>
                <select
                    {...input}
                    className="form-control"
                >
                    <option>{firstOptionName}</option>
                    {renderOptions(data)}
                </select>
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

export default FormSelect;
