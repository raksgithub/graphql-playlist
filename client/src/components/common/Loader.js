import React from 'react';
import ReactLoader from 'react-loader-spinner';

const Loader = props => {
    const { 
        type = 'CradleLoader', 
        color = '#00BFFF', 
        height = '100',
        width = '100',
    } = props;
    return (
        <ReactLoader
            type={type}
            color={color}
            height={height}
            width={width}
        />
    );
}

export default Loader;
