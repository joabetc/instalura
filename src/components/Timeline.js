import React, { Component } from "react";
import PhotoItem from './PhotoItem';
import ReactCSSTransitionGroup from 'react';
import TimelineApi from '../business/TimelineAPI';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = { photos: [] };
    this.login = this.props.login;
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState({photos: this.props.store.getState()});
    });
  }

  loadPhotos() {
    let profileURL;
    if (this.login === undefined) {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
    }
    this.props.store.dispatch(TimelineApi.list(profileURL));
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
    this.props.timelineBO.like(photoId);
  }

  createComment(photoId, commentText) {
    this.props.store.dispatch(TimelineApi.createComment(photoId, commentText));
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