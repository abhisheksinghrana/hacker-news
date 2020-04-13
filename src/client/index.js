// Startup point for the client side application
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App'
import '../index.scss';
import rootReducer from './reducer';

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

hydrate(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);