import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getBookQuery } from '../../graphql/queries/book';
import { get as _get } from 'lodash';

// Components
import AddBookForm from './form/AddBookForm';
import Loader from '../../components/common/Loader';

class EditBook extends Component {
    render() {
        return (
            <div>
                <h2>Edit Book</h2>
                <Query 
                    query={getBookQuery}
                    variables={{
                        bookId: _get(this.props, 'match.params.id')
                    }}
                >
                    {
                        ({ data, error, loading }) => {
                            if (error) return 'error';
                            if (loading) return <Loader />
                            return (
                                <AddBookForm
                                    className='mt-2'
                                    operationText='Add Book'
                                    initialValues={{
                                        bookName: _get(data, 'book.name'),
                                        bookGenre: _get(data, 'book.genre'),
                                        author: _get(data, 'book.author.id')
                                    }}
                                />
                            );
                        }
                    }
                </Query>
            </div>
        );
    }
}

export default EditBook;
