import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const middlewares = [thunk];
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: f => f

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
	devTools = a => a;
}
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), devTools));

const persistor = persistStore(store);


export { store, persistor };

