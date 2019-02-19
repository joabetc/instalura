import {list, like, comments, notify} from '../actions/actionCreator';

export default class TimelineAPI {

  static like(photoId) {
    return dispatch => {
      fetch(
        `https://instalura-api.herokuapp.com/api/public/fotos/${photoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
        { method: 'POST' }
      ).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('It was not possible to like the photo!');
        }
      }).then(liker => {
        dispatch(like(photoId, liker));
        return liker;
      });
    }
  }

  static createComment(photoId, commentText) {
    return dispatch => {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({ texto: commentText }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };
  
      fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${photoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
          requestInfo
      ).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('It was not possible to comment!');
        }
      }).then(comment => {
        dispatch(comments(photoId, comment));
        return comment;
      });
    }
  }

  static list(profileURL) {
    return dispatch => {
      fetch(profileURL)
        .then(response => response.json())
        .then(photos => {
          dispatch(list(photos));
          return photos;
        });
    }
  }

  static search(login) {
    return dispatch => {
      fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${login}}`)
      .then(response => response.json())
      .then(photos => {
        if (photos.length === 0) {
          dispatch(notify('User not found!'));
        }
        dispatch(list(photos));
        return photos;
      });
    }
  }
}