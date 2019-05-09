import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getAuthorsQuery } from '../../graphql/queries/author'

// Components
import Loader from '../../components/common/Loader';
import Author from '../../components/Author';

class AuthorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAuthorId: null
        };
    }
    render() {
        return (
            <Query query={getAuthorsQuery}>
                {
                    ({ loading, error, data }) => {
                        if (error) {
                            return <div>Error in Component</div>
                        }
                        if (loading) {
                            return (
                                <Loader />
                            );
                        }
                        // console.log('Data=>>>', data);
                        const { authors } = data;
                        return (
                            <div>
                                <div className='book-list-header'>
                                    Author List
                                    <span className='add-navigation-button'>
                                        <button
                                            title='Add an author'
                                            onClick={() => this.props.history.push('/addAuthor')}
                                        >
                                            +
                                        </button>
                                    </span>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-8 col-6">
                                        <div className="list-group">
                                            {authors.map((author, index) => (
                                                <Author
                                                    key={author.id}
                                                    id={author.id}
                                                    name={author.name}
                                                    age={author.age}
                                                    index={index}
                                                    onAuthorClick={() => this.setState({ selectedAuthorId: author.id })}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-6">
                                        {/* <BookDetail bookId={this.state.selectedBookId} /> */}
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

export default AuthorContainer;
