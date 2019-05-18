import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery } from '../../graphql/queries/author';
import { addBookMutation } from '../../graphql/mutations/book';
import { getBooksQuery } from '../../graphql/queries/book';

// Components
import Loader from '../../components/common/Loader';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
        this.renderAuthors = this.renderAuthors.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const { name, genre, authorId } = this.state;
        this.props.addBookMutation({
            variables: {
                name, genre, authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
        this.setState({
            name: '',
            genre: '',
            authorId: ''
        });
        this.props.history.push('/books');
    }
    /* Rener authors start */
    renderAuthors(authors) {
        return authors.map(author => (
            <option key={author.id} value={author.id}>
                {author.name}
            </option>
        ));
    }
    /* Rener authors end */
    render() {
        const { loading, authors } = this.props.getAuthorsQuery;
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
                <h2>Add New Book</h2>
                <form onSubmit={this.handleFormSubmit} className="mt-2">
                    <div className="form-group">
                        <label>Book Name</label>
                        <input
                            name='bookName'
                            className="form-control"
                            placeholder="Book Name"
                            value={this.state.name}
                            autoComplete="off"
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input
                            name='genre'
                            className="form-control"
                            placeholder="Genre"
                            value={this.state.genre}
                            autoComplete="off"
                            onChange={e => this.setState({ genre: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Authors</label>
                        <select
                            name="authors"
                            className="form-control"
                            value={this.state.authorId}
                            onChange={e => this.setState({ authorId: e.target.value })}
                        >
                            <option>--Select Author--</option>
                            {this.renderAuthors(authors)}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Book</button>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook); 
