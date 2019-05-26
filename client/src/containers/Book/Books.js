import React from 'react';
import { Query } from 'react-apollo';
import Book from '../../components/Book';
import { getBooksQuery } from '../../graphql/queries/book';
import Icon from '@material-ui/icons/AddCircle';
import { cyan, deepOrange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { get as _get } from 'lodash';

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
        return (
            <Query query={getBooksQuery}>
                {
                    ({ data, error, loading }) => {
                        if (error) return 'error';
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
                                    tableData={mapBookTableData(_get(data, 'books'))}
                                    onBookClick={this.handleBookDelete}
                                />
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

Books = withStyles(styles)(Books);

export default Books;
