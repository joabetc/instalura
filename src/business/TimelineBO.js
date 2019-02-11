import PubSub from 'pubsub-js';

export default class TimelineBO {

  constructor(photos) {
    this.photos = photos;
  }

  like(photoId) {
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
      const foundPhoto = this.photos.find(photo => photo.id === photoId);
      foundPhoto.liked = foundPhoto.liked;
      const possibleLiker = foundPhoto.likers.find(currentLiker => currentLiker.login === liker.login);
      if (possibleLiker === undefined) {
        foundPhoto.likers.push(liker);
      } else {
        const newLikers = foundPhoto.likers.filter(currentLiker => currentLiker.login !== liker.login);
        foundPhoto.likers = newLikers;
      }
      PubSub.publish('timeline', this.photos);
    });
  }
}