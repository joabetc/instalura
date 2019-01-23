import React, { Component } from 'react';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {message: ''};
  }

  send(event) {
    event.prevendDefault();

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

    fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text()
        } else {
          this.setState({message: 'It was not possible to login!'})
        }
      })
      .then(token => {
        console.log(token);
      })
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