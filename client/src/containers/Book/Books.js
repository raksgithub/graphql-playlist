import React from 'react';
import { graphql, compose } from 'react-apollo';
import Book from '../../components/Book';
import { getBooksQuery } from '../../graphql/queries/book';
import Icon from '@material-ui/icons/AddCircle';
import { cyan, deepOrange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

// Components
import Loader from '../../components/common/Loader';

// Mappers
import { mapBookTableData } from '../../mappers/book';

const styles = theme => ({
    icon: {
        margin: theme.spacing(2),
        fontSize: '50px',
        color: cyan[800],
        '&:hover': {
            color: deepOrange[800],
            cursor: 'pointer'
        }
    }
});

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookId: null
        }
        this.handleBookDelete = this.handleBookDelete.bind(this);
    }
    handleBookDelete(deletedbookId) {
        this.setState({ selectedBookId: deletedbookId });
    }
    render() {
        const { loading, books } = this.props.getBooksQuery;
        if (loading) return (
            <div className='loader'>
                <Loader
                    type='CradleLoader'
                    color='#00BFFF'
                    widht='100'
                    height='100'
                />
            </div>
        );
        const { classes } = this.props;
        return (
            <div>
                <div className='book-list-header'>
                    Book Table
                    <Icon 
                        className={classes.icon + ' add-navigation-button'} 
                        color="action"
                        onClick={() => this.props.history.push('/addBook')} 
                    />
                </div>
                <hr />
                <Book
                    tableData={mapBookTableData(books)}
                    onBookClick={this.handleBookDelete}
                />
            </div>
        );
    }
}

Books = withStyles(styles)(Books);

export default compose(
    graphql(getBooksQuery, { name: 'getBooksQuery' }),
)(Books);
