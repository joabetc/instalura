import React, { Component } from "react";
import PhotoItem from './PhotoItem';
import ReactCSSTransitionGroup from 'react';
import TimelineApi from '../business/TimelineAPI';
import {connect} from 'react-redux';

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.login = this.props.login;
  }

  loadPhotos() {
    let profileURL;
    if (this.login === undefined) {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
    }
    this.props.list(profileURL);
  }

  componentDidMount() {
    this.loadPhotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.login) {
      this.login = nextProps.login;
      this.loadPhotos();
    }
  }

  render() {
    return (
      <div className="fotos container">
      <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {this.props.photos.map(photo => <PhotoItem key={photo.id} photo={photo} like={this.props.like} createComment={this.props.createComment}/>)}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {photos: state.timeline}
}

const mapDispatchToProps = dispatch => {
  return {
    like: photoId => {
      dispatch(TimelineApi.like(photoId));
    },
    createComment: (photoId, commentText) => {
      dispatch(TimelineApi.createComment(photoId, commentText))
    },
    list: profileURL => {
      dispatch(TimelineApi.list(profileURL));
    }
  }
}

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;