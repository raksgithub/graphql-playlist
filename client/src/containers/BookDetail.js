import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBookQuery } from '../graphql/queries/book';

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { bookId, getBookQuery: { book, loading } } = this.props;
        if (!book) {
            return <div>Select one book to display its details here.</div>
        }
        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    Loading...
                </div>
            );
        }
        return (
            <div className="card w-80">
                <div className="card-body">
                    <h5 className="card-title">{book.name}</h5>
                    <hr />
                    <span className="card-title">{book.genre}</span>
                    <div>
                        Author: <span>{book.author.name}</span><br />
                        age: <span>{book.author.age}</span>
                        <div>
                            <span>Books written:</span>
                            <ul>{book.author.books.map(b => <li key={b.id}>{b.name}</li>)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    // Here bookId => props.bookId. This props comes from parent Books component.
    graphql(getBookQuery, {
        name: 'getBookQuery', options: ({ bookId }) => {
            return {
                variables: {
                    bookId
                }
            }
        }
    })
)(BookDetail);