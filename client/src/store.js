import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Add more middleware to the array of below middlewares
const middleware = [thunk,];
const preloadedState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    preloadedState, 
    composeEnhancers(applyMiddleware(...middleware))
);

export { store };