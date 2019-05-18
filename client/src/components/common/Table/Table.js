import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';

// Components
import MyExportCSV from './MyExportCSV';
import MySearchBar from './MySearchBar';

const Table = props => {
    const {
        columns,
        data,
        keyField,
        exportCSV,
        noDataIndication,
        defaultSorted,
        isPagination,
        selectRow,
        cellEdit,
        editMode,
        search
    } = props;
    return (
        <div>
            <ToolkitProvider
                keyField={keyField}
                data={data}
                columns={columns}
                exportCSV={exportCSV}
                search={search}
            >
                {
                    ({ csvProps, searchProps, baseProps }) => (
                        <div>
                            <div className='flex-row'>
                                {exportCSV ? <MyExportCSV {...csvProps} /> : ''}
                                {search ? <MySearchBar {...searchProps} /> : ''}
                            </div>
                            <BootstrapTable
                                {...baseProps}
                                bootstrap4
                                noDataIndication={noDataIndication}
                                defaultSorted={defaultSorted}
                                pagination={isPagination ? paginationFactory() : isPagination}
                                selectRow={selectRow}
                                striped
                                hover
                                cellEdit={cellEdit ? cellEditFactory({ mode: `${editMode}` }) : cellEdit}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    );
}

export default Table;
