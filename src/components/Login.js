import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {message: ''};
  }

  send(event) {
    event.preventDefault();

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.login.value,
        senha: this.password.value
      }),
      headers: new Headers({
        'Contant-type': 'application/json'
      })
    };

    //browserHistory.push('/timeline');
    
    fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('It was not possible to login!')
        }
      })
      .then(token => {
        localStorage.setItem('auth-token', token)
        browserHistory.push('/timeline');
      })
      .catch(error => {
        this.setState({message: error.message});
      });
  }

  render() {
    return (
      <div className="login-box">
        <h1 className="header-top">Instalura</h1>
        <span>{this.state.message}</span>
        <form onSubmit={this.send.bind(this)}>
          <input type="text" ref={(input) => this.login = input}/>
          <input type="password" ref={(input) => this.password = input}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}