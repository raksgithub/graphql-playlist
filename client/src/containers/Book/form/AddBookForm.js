import React from 'react';
import { reduxForm, Field } from 'redux-form';

// Components
import FormInput from '../../../components/common/form/FormInput';
import FormSelect from '../../../components/common/form/FormSelect';

let AddBookForm = props => {
    const {
        handleSubmit,
        pristine,
        reset,
        authors,
        submitting,
        className,
        handleFormSubmit,
        operationText,
    } = props;
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
                data={authors}
                firstOptionName='--Select Author--'
            />
            <div>
                <button 
                    type="submit"
                    className="btn btn-success" 
                    disabled={!submitting && pristine}
                >
                    {operationText ? operationText : 'Submit'}
                </button>
                {' '}
                <button 
                    type="button"
                    className="btn btn-secondary" 
                    disabled={!submitting && pristine}
                    onClick={reset}
                >
                    {'Clear Form'}
                </button>
            </div>
        </form>
    );
}

AddBookForm = reduxForm({
    form: 'BookForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    destroyOnUnmount: true,
})(AddBookForm);

export default AddBookForm;
