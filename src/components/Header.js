import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {

  search(event) {
    event.preventDefault();
    fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${this.searchedLogin.value}}`)
      .then(response => response.json())
      .then(photos => {
        PubSub.publish('timeline', photos);
      });
  }

  render() {
    return (
      <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>

           <form className="header-busca" onSubmit={this.search.bind(this)}>
            <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.searchedLogin = input}/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>


           <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="#">
                  ♡
                  {/*                 ♥ */}
                  {/* Quem deu like nas minhas fotos */}
                </a>
              </li>
            </ul>
          </nav>
        </header>
    )
  }
}
