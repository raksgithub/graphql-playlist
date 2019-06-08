import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getAuthorQuery } from '../../graphql/queries/author';
import { isEmpty as _isEmpty } from 'lodash';

// Components
import Loader from '../../components/common/Loader';

class AuthorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderBooks = books => {
        return (
            <div>
                Books: 
                <ul>
                    {books.map(book => <li key={book.id}>{book.name}</li>)}
                </ul>
            </div>
        );
    }

    render() {
        const { authorId } = this.props;
        if (!authorId) {
            return <div>Please select author to display its details here.</div>
        }
        return (
            <Query
                query={getAuthorQuery}
                variables={{ authorId }}
            >
                {
                    ({ data, loading, error }) => {
                        if (error) {
                            return <div>Error occured somewhere</div>
                        }
                        if (loading) {
                            return <Loader />
                        }
                        const { author: { name, age, books } } = data;
                        return (
                            <div className="card w-80">
                                <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                    <hr />
                                    <span className="card-title">Age: {age}</span>
                                    <div>
                                        {!_isEmpty(books) ? this.renderBooks(books) : 'No Books'}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

export default AuthorDetail;
