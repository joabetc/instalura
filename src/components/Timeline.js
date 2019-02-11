import React, { Component } from "react";
import PhotoItem from './PhotoItem';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react';
import TimelineBO from '../business/TimelineBO';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = { photos: [] };
    this.login = this.props.login;
    this.timelineBO = new TimelineBO([]);
  }

  componentWillMount() {
    PubSub.subscribe('timeline', (topic, photos) => {
      this.setState({photos});
    });

    PubSub.subscribe('new-comments', (topic, commentInfo) => {
      const foundPhoto = this.state.photos.find(photo => photo.id === commentInfo.photoId);
      const newComments = this.state.comments.push(commentInfo.comment);
      this.setState({photos: this.state.photos});
    });
  }

  loadPhotos() {
    let profileURL;
    if (this.login === undefined) {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
    }
  
    fetch(profileURL)
      .then(response => response.json())
      .then(photos => {
        this.setState({
          photos: photos
        });
        this.timelineBO = new TimelineBO(photos);
      });
  }

  componentDidMount() {
    this.loadPhotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.loadPhotos();
    }
  }

  like(photoId) {
    this.timelineBO.like(photoId);
  }

  createComment(photoId, commentText) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: commentText }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }

    fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${photoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
        requestInfo
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('It was not possible to comment!');
      }
    }).then(comment => {
      PubSub.publish('new-comments' , { photoId, comment })
    });
  }

  render() {
    return (
      <div className="fotos container">
      <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo} like={this.like.bind(this)} createComment={this.createComment}/>)}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}