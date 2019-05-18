import React from 'react';

const MyExportCSV = ({ onExport }) => {
    const handleClick = () => {
        onExport();
    };
    return (
        <div className='mb-2'>
            <button className="btn btn-secondary" onClick={handleClick}>Export to CSV</button>
        </div>
    );
}

export default MyExportCSV;
