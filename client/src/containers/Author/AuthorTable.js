import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { get as _get } from 'lodash';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    thead: {
        color: 'honeydew',
        fontSize: "17px",
        fontWeight: "bold",
    },
    table: {
        minWidth: 650,
    },
}));

const renderBooks = books => {
    return books.map(book => (
        <Chip
            key={_get(book, 'id')}
            label={_get(book, 'name')}
        />
    ));
}

const AuthorTable = props => {
    const { root, thead, table } = useStyles();
    const { data } = props;

    return (
        <Paper className={root}>
            <Table className={table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={thead}>Author Name</TableCell>
                        <TableCell className={thead}>Author Age</TableCell>
                        <TableCell align='center' className={thead}>Author Books</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(author => (
                        <TableRow key={_get(author, 'id')}>
                            <TableCell component="th" scope="row">
                                {_get(author, 'name')}
                            </TableCell>
                            <TableCell>{_get(author, 'age')}</TableCell>
                            <TableCell>{renderBooks(_get(author, 'books'))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default AuthorTable;
