import React, { Component } from "react";
import PhotoItem from './PhotoItem';
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
    this.timelineBO.subscribe(photos => {
      this.setState({photos});
    });
  }

  loadPhotos() {
    let profileURL;
    if (this.login === undefined) {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
    }

    this.timelineBO.list(profileURL);
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
    this.timelineBO.createComment(photoId, commentText);
  }

  render() {
    return (
      <div className="fotos container">
      <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo} like={this.like.bind(this)} createComment={this.createComment.bind(this)}/>)}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}