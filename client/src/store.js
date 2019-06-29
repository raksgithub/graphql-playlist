import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import thunk from 'redux-thunk';
import reducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    blacklist: ['form']
}

const persistedReducer = persistReducer(persistConfig, reducer);

// Add more middleware to the array of below middlewares
const middleware = [thunk,];
const preloadedState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    persistedReducer,
    preloadedState, 
    process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(...middleware)) : applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };