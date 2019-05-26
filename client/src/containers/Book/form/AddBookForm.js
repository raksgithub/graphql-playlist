import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Query, graphql, compose } from 'react-apollo';
import { getAuthorsQuery } from '../../../graphql/queries/author';
import { addBookMutation } from '../../../graphql/mutations/book';
import { getBooksQuery } from '../../../graphql/queries/book';
import { get as _get } from 'lodash';

// Components
import FormInput from '../../../components/common/form/FormInput';
import FormSelect from '../../../components/common/form/FormSelect';
import Loader from '../../../components/common/Loader';

let AddBookForm = props => {
    const handleFormSubmit = values => {
        const { bookName, bookGenre, author } = values;
        this.props.addBookMutation({
            variables: {
                name: bookName, 
                genre: bookGenre, 
                authorId: author
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
        this.props.history.push('/books');
    }
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        className,
        operationText,
    } = props;
    return (
        <Query query={getAuthorsQuery}>
            {
                ({ data, loading, error }) => {
                    if (error) return 'error';
                    if (loading) return <Loader />;
                    return (
                        <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
                            <Field
                                name="bookName"
                                type='text'
                                component={FormInput}
                                label='Book Name'
                                placeholder='Please enter book name'
                                autoComplete='off'
                            />
                            <Field
                                name="bookGenre"
                                type='text'
                                component={FormInput}
                                label='Book Genre'
                                placeholder='Please enter book genre'
                                autoComplete='off'
                            />
                            <Field
                                name='author'
                                component={FormSelect}
                                label='Author Name'
                                data={_get(data, 'authors')}
                                firstOptionName='--Select Author--'
                            />
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={(!submitting && pristine) && !_get(props, 'initialValues')}
                                >
                                    {operationText ? _get(props, 'initialValues') ? 'Update Book' : operationText : 'Submit'}
                                </button>
                                {' '}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    disabled={(!submitting && pristine) && !_get(props, 'initialValues')}
                                    onClick={reset}
                                >
                                    {'Clear Form'}
                                </button>
                            </div>
                        </form>
                    );
                }
            }
        </Query>
    );
}

AddBookForm = reduxForm({
    form: 'BookForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    destroyOnUnmount: true,
})(AddBookForm);

export default compose(
    graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBookForm);
