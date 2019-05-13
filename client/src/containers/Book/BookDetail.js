import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBookQuery } from '../../graphql/queries/book';
import Loader from '../../components/common/Loader';

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { bookId, getBookQuery: { book, loading } } = this.props;
        if (!book || !bookId) {
            return <div>Select one book to display its details here.</div>
        }
        console.log('BookId=>>>', bookId);
        if (loading) {
            return (
                <div className='loader'>
                    <Loader
                        type='CradleLoader'
                        color='#00BFFF'
                        widht='100'
                        height='100'
                    />
                </div>
            );
        }
        return (
            <div className="card w-80">
                <div className="card-body">
                    <h5 className="card-title">{book.name}</h5>
                    <hr />
                    <span className="card-title">Genre: {book.genre}</span>
                    <div>
                        Author: <span>{book.author ? book.author.name : 'No Author'}</span><br />
                        age: <span>{book.author ? book.author.age : 'No Age'}</span>
                        <div>
                            <span>Books written:</span>
                            <ul>{book.author ? book.author.books.map(b => <li key={b.id}>{b.name}</li>) : 'No Books'}</ul>
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