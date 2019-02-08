import React, { Component } from 'react';
import { Link } from 'react-router';
import { Pubsub } from 'pubsub-js';
import Header from './Header';

class PhotoUpdates extends Component {

  constructor(props) {
    super(props);
    this.state = { liked: this.props.photo.likeada };
  }

  like(event) {
    event.preventDefault();
    this.setState({ liked: !this.state.liked });
    this.props.like(this.props.photo.id);
  }

  createComment(event) {
    event.preventDefault();
    this.props.createComment(this.props.photo.id, this.comment.value);
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.like.bind(this)} href="#" className={this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
        <form className="fotoAtualizacoes-form" onSubmit={this.createComment.bind(this)}>
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comment = input}/>
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
        </form>
      </section>
    );
  }
}

class PhotoInfo extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      likers: this.props.photo.likers,
      comments: this.props.photo.comments
    };
  }

  componentWillMount() {
    Pubsub.subscribe('update-liker', (topic, likerInfo) => {
      if (this.props.photo.id === likerInfo.photoId) {
        const possibleLiker = this.state.likers.find(liker => liker.login === likerInfo.liker.login);
        if (possibleLiker === undefined) {
          const newLikers = this.state.likers.concat(likerInfo.liker);
          this.setState({likers: newLikers});
        } else {
          const newLikers = this.state.likers.filter(liker => liker.login !== likerInfo.liker.login);
          this.setState({likers: newLikers});
        }
      }
    });

    Pubsub.subscribe('new-comments', (topic, commentInfo) => {
      if (this.props.photo.id === commentInfo.photoId) {
        const newComments = this.state.comments.concat(commentInfo.comment);
        this.setState({comments: newComments});
      }
    });
  }

  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.state.likers.map(liker => {
              return (<Link key={liker.login} href={`/timeline/${liker.login}`}>{liker.login},</Link>);
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
            this.state.comments.map(comment => {
              return (
                <li className="comentario" key={comment.id}>
                  <Link to={`/timeline/${comment.login}`} className="foto-info-autor">{comment.login}</Link>
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

          <PhotoUpdates photo={this.props.photo} like={this.props.like} createComment={this.props.createComment}/>
        </div>
    );
  }
}