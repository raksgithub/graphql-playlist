import React from 'react';
import { graphql, compose } from 'react-apollo';
import Book from '../../components/Book';
import { getBooksQuery } from '../../graphql/queries/book';

// Components
import Loader from '../../components/common/Loader';

// Mappers
import { mapBookTableData } from '../../mappers/book';

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
        return (
            <div>
                <div className='book-list-header'>
                    Book Table
                    <span className='add-navigation-button'>
                        <button onClick={() => this.props.history.push('/addBook')}>
                            +
                        </button>
                    </span>
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

export default compose(
    graphql(getBooksQuery, { name: 'getBooksQuery' }),
)(Books);
