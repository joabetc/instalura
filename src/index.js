import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import { Router, Route, browserHistory } from 'react-router';
import * as serviceWorker from './serviceWorker';

function verifyAuthentication(nextState, replace) {
  if (localStorage.getItem('auth-token') === null) {
    replace('/?msg=You need to be logged in to access this url');
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/timeline" component={App} onEnter={verifyAuthentication}/>
    <Route path="/logout" component={Logout}/>
  </Router>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
