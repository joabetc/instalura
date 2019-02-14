import PubSub from 'pubsub-js';

export default class TimelineAPI {

  constructor(photos) {
    this.photos = photos;
  }

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
        dispatch({type: 'like', photoId, liker});
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
        dispatch({type: 'comment', photoId, comment});
        return comment;
      });
    }
  }

  static list(profileURL) {
    return dispatch => {
      fetch(profileURL)
        .then(response => response.json())
        .then(photos => {
          dispatch({type: 'list', photos});
          return photos;
        });
    }
  }

  subscribe(callback) {
    PubSub.subscribe('timeline', (topic, photos) => {
      callback(photos);
    });
  }
}