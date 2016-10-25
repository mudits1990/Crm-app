import React from 'react';
import ReactDOM from 'react-dom';
import VisibleApp from './App';
import './index.css';
import crmApp from './reducers/index'
import {createStore} from 'redux';
import {Provider} from 'react-redux'

let store = createStore(crmApp);

ReactDOM.render(
    <Provider store={store}>
        <VisibleApp />
    </Provider>,
  document.getElementById('root')
);

