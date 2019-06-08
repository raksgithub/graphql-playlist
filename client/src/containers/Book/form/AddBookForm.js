import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Query } from 'react-apollo';
import { getAuthorsQuery } from '../../../graphql/queries/author';
import { get as _get } from 'lodash';

// Components
import FormInput from '../../../components/common/form/FormInput';
import ReactSelect from '../../../components/common/form/ReactSelect';
import Loader from '../../../components/common/Loader';

let AddBookForm = props => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        className,
        operationText,
        handleFormSubmit
    } = props;
    return (
        <Query query={getAuthorsQuery}>
            {
                ({ data, loading, error }) => {
                    if (error) return 'error';
                    if (loading) return <Loader />;
                    debugger;
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
                                component={ReactSelect}
                                label='Author Name'
                                data={_get(data, 'authors').map(author => {
                                    return { label: _get(author, 'name'), value: _get(author, 'id') };
                                })}
                                firstOptionName='--Select Author--'
                            />
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={(!submitting && pristine) && !_get(props, 'initialValues')}
                                >
                                    {operationText ? operationText : 'Submit'}
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

export default AddBookForm;
