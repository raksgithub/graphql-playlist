import React from 'react';
import { graphql, compose } from 'react-apollo';
import Book from '../../components/Book';
import { getBooksQuery } from '../../graphql/queries/book';

// Components
import Loader from '../../components/common/Loader';
import BookDetail from './BookDetail';

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookId: null
        }
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
                    tableData={books}
                    // onBookClick={() => this.setState({ selectedBookId: book.id })}
                />
            </div>
        );
    }
}

export default compose(
    graphql(getBooksQuery, { name: 'getBooksQuery' }),
)(Books);
