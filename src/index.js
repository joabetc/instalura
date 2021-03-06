import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import { Router, Route, browserHistory } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';
import { notify } from './reducers/header';
import { Provider } from 'react-redux';

function verifyAuthentication(nextState, replace) {
  
  const result = matchPattern('/timeline(/:login)', nextState.location.pathname);
  const privateAddress = result.paramValues[0] == undefined;
  if (privateAddress && localStorage.getItem('auth-token') === null) {
    replace('/?msg=You need to be logged in to access this url');
  }
}

const reducers = combineReducers({timeline, notify});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/timeline(/:login)" component={App} onEnter={verifyAuthentication}/>
        <Route path="/logout" component={Logout}/>
      </Router>
    </Provider>
  ),
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
