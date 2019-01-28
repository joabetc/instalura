import React, { Component } from 'react';
import { Link } from 'react-router';

class PhotoUpdates extends Component {

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a href="#" className="fotoAtualizacoes-like">Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
        </form>
      </section>
    );
  }
}

class PhotoInfo extends Component {

  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.props.photo.likers.map(liker => {
              return (<a key={liker.login} href="#">{liker.login},</a>);
            })
          }
          curtiram
        </div>
        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor </a>
          {this.props.photo.cometario}
        </p>

        <ul className="foto-info-comentarios">
          {
            this.props.photo.comentarios.map(comment => {
              return (
                <li className="comentario" key={comment.id}>
                  <Link to={`/timeline/${comment.login}`}>{comment.login} </Link>
                  {comment.texto}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

class PhotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.photo.urlPerfil} alt="foto do usuario"/>
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${this.props.photo.loginUsuario}`}>
              {this.props.photo.loginUsuario}
            </Link>  
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.photo.horario}</time>
      </header>
    );
  }
}

export default class PhotoItem extends Component {

  render() {
    return (
      <div className="foto">
          <PhotoHeader photo={this.props.photo}/>

          <img alt="foto" className="foto-src" src={this.props.photo.urlFoto}/>

          <PhotoInfo photo={this.props.photo}/>

          <PhotoUpdates/>
        </div>
    );
  }
}