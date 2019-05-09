import React, { Component } from 'react';
import { addAuthorMutation } from '../../graphql/mutations/author';
import { getAuthorsQuery } from '../../graphql/queries/author';
import { Mutation } from 'react-apollo';

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    async handleFormSubmit(e, addAuthor) {
        e.preventDefault();
        const { name, age } = this.state;
        const response = await addAuthor({
            variables: {
                name, age
            },
            refetchQueries: [{
                query: getAuthorsQuery
            }]
        });
        console.log('Response=>>>>', response);
        this.setState({
            name: '',
            genre: '',
            authorId: ''
        });
        this.props.history.push('/authors');

    }
    render() {
        return (
            <div>
                <h2>Add New Author</h2>
                <Mutation mutation={addAuthorMutation}>
                    {
                        (addAuthor, { data }) => (
                            <form onSubmit={(e) => this.handleFormSubmit(e, addAuthor)} className="mt-2">
                                <div className="form-group">
                                    <label>Author Name</label>
                                    <input
                                        type='text'
                                        name='authorName'
                                        className="form-control"
                                        placeholder="Author Name"
                                        value={this.state.name}
                                        onChange={e => this.setState({ name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Author Age</label>
                                    <input
                                        type='number'
                                        name='genre'
                                        className="form-control"
                                        placeholder="Genre"
                                        value={this.state.genre}
                                        onChange={e => this.setState({ age: parseInt(e.target.value) })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Author</button>
                            </form>
                        )
                    }
                </Mutation>
            </div>
        );
    }
}

export default AddAuthor;
