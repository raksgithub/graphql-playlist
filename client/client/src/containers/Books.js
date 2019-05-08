import React from 'react';
import { graphql, compose } from 'react-apollo';
import Book from '../components/Book';
import { getBooksQuery } from '../graphql/queries/book';
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
        if (loading) return <div>Loading...</div>;
        return (
            <div className="row">
                <div className="col-sm-8 col-6">
                    <div className="list-group">
                        {books.map((book, index) => (
                            <Book
                                key={book.id}
                                id={book.id}
                                name={book.name}
                                index={index}
                                onBookClick={() => this.setState({ selectedBookId: book.id })}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-sm-4 col-6">
                    <BookDetail bookId={this.state.selectedBookId} />
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getBooksQuery, { name: 'getBooksQuery' }),
)(Books);
