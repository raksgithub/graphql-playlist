import React, { Component } from 'react';

// Components
import Table from '../common/Table/Table';

class BookTable extends Component {
    columns = () => [{
        dataField: 'name',
        text: 'Book Name',
        headerAlign: 'center',
        style: { textAlign: 'center' },
        sort: true
    }, {
        dataField: 'genre',
        text: 'Book Genre',
        headerAlign: 'center',
        style: { textAlign: 'center' },
        sort: true
    }, {
        dataField: 'actions',
        text: 'Actions',
        headerAlign: 'center',
        style: { textAlign: 'center' },
        csvExport: false,
        editable: false,
        formatter: this.actionsFormatter
    }];

    actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <button className='btn btn-secondary mr-2'>Edit</button>
                <button 
                    className='btn btn-danger' 
                    onClick={() => this.props.handleShow(row.id)}
                >
                    Delete
                </button>
            </div>
        );
    };

    indication = () => {
        return 'No data in this table at the moment.';
    }

    defaultSorted = () => [{
        dataField: 'name',
        order: 'desc'
    }, {
        dataField: 'genre',
        order: 'desc'
    }];

    selectRow = () => ({
        mode: 'checkbox',
        style: { backgroundColor: '#c8e6c9' },
        clickToSelect: false
    });

    render() {
        const { data } = this.props;
        return (
            <div>
                <Table
                    columns={this.columns()}
                    data={data}
                    keyField='id'
                    exportCSV={true}
                    search={true}
                    noDataIndication={this.indication()}
                    defaultSorted={this.defaultSorted()}
                    selectRow={this.selectRow()}
                    isPagination={true}
                    cellEdit={true}
                    editMode='dbclick'
                />
            </div>
        );
    }
}

export default BookTable;
