import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getAuthorsQuery } from '../../graphql/queries/author'

// Components
import Loader from '../../components/common/Loader';
import AuthorTable from './AuthorTable';

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
                                <AuthorTable data={authors} />
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

export default AuthorContainer;

