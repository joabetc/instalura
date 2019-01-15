import React, { Component } from 'react';

export default class Login extends Component {

  render() {
    return (
      <div className="login-box">
        <h1 className="header-top">Instalura</h1>
        <form>
          <input type="text"/>
          <input type="password"/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}