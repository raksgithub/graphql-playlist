import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery } from '../graphql/queries/author';
import { addBookMutation } from '../graphql/mutations/book';
import { getBooksQuery } from '../graphql/queries/book';

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
        if (loading) return <div>Loading...</div>;
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label>Book Name</label>
                    <input 
                        name='bookName' 
                        className="form-control" 
                        placeholder="Book Name"
                        onChange={e => this.setState({ name: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input 
                        name='genre' 
                        className="form-control" 
                        placeholder="Genre"
                        onChange={e => this.setState({ genre: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label>Authors</label>
                    <select 
                        name="authors" 
                        className="form-control"
                        onChange={e => this.setState({ authorId: e.target.value })}
                    >
                        <option>--Select Author--</option>
                        { this.renderAuthors(authors) }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' }), 
)(AddBook); 
