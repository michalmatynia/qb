import React from 'react';
import ReactDOM from 'react-dom';
// import './Resources/css/styles.css';
// KIT DASHBOARD
// import './templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/css/material-dashboard-pro-react.css';

// FRONTEND CSS
import './themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/css/material-kit-pro-react.css';
// import './templates/creativetim/material-kit-pro-react-v1.9.0/assets/css/material-kit-pro-react.min.css';
// import "./templates/creativetim/material-kit-pro-react-v1.9.0/assets/scss/material-kit-pro-react.scss";

import { BrowserRouter } from 'react-router-dom';
// import Routes from './routes';
import App from './app';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './redux/reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
    );