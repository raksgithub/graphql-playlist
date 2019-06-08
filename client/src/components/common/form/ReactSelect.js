import React from 'react';
import Select from 'react-select';
import { get as _get } from 'lodash';

export default props => {
    const {
        input,
        label,
        data,
        firstOptionName,
        meta: { touched, dirty, error, warning }
    } = props;
    const {onBlur, ...rest} = input;
    return (
        <div className='form-group'>
            <label>{label}</label>
            <Select
                { ...rest }
                options={data}
                formatGroupLabel={label}
            />
            {(touched || dirty) && error && (
                <span>{error}</span>
            )}
            {(touched || dirty) && warning && (
                <span>{warning}</span>
            )}
        </div>
    );
};