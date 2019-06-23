import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

// Reducers
import { signInReducer } from './signIn';

export default combineReducers({
    form: formReducer,
    signInReducer
});