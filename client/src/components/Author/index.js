import React from 'react';
import { Mutation } from 'react-apollo';
import { deleteAuthorMutation } from '../../graphql/mutations/author';
import { getAuthorsQuery } from '../../graphql/queries/author';
import { get as _get } from 'lodash';

// Components
import DeleteModal from '../../components/common/DeleteModal';

class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            lastDeletedAuthor: null
        };
        this.handleDeleteAuthor = this.handleDeleteAuthor.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }
    async handleDeleteAuthor(authorId, deleteAuthor) {
        const response = await deleteAuthor({
            variables: {
                authorId
            },
            refetchQueries: [{
                query: getAuthorsQuery
            }],
        });
        const deletedAuthor = _get(response, 'data.deleteAuthor', {});
        this.setState({
            lastDeletedAuthor: deleteAuthor
        });
        console.log('deletedAuthor=>>>', deletedAuthor);
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        const { id, name, age, onAuthorClick } = this.props;
        return (
            <Mutation mutation={deleteAuthorMutation}>
                {
                    (deleteAuthor, { data }) => (
                        <div className="row-item list-group-item">
                            <div className="bookName" onClick={onAuthorClick}>
                                {name}
                                Age: {age}
                            </div>
                            <div>
                                <button className="btn btn-secondary mx-2">Edit</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.handleShow}
                                >
                                    Delete
                                </button>
                                <DeleteModal
                                    show={this.state.show}
                                    title={name}
                                    body={'Do you want to delete this author permanantly ?'}
                                    deleteButtonDisplayText='Delete Author'
                                    closeButtonDisplayText='Close'
                                    handleDelete={() => this.handleDeleteAuthor(id, deleteAuthor)}
                                    handleClose={this.handleHide}
                                    size="lg"
                                />
                            </div>
                        </div>
                    )
                }
            </Mutation>
        );
    }
}

export default Author;
