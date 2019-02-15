import {List} from 'immutable';

export function timeline(state = [], action) {
  if (action.type === 'list') {
    return List(action.photos);
  }

  if (action.type === 'comnent') {
    const oldStatePhoto = state.find(photo => photo.id === action.photoId);
    const newComments = oldStatePhoto.comments.concat(action.comment);
    
    const newStatePhoto = Object.assign({}, oldStatePhoto, {comments: newComments});
    const listIndex = state.findIndex(photo => photo.id === action.photoId);

    const newList = state.set(listIndex, newStatePhoto);

    return newList;
  }

  if (action.type === 'like') {
    const liker = action.liker;
    const foundPhoto = state.find(photo => photo.id === action.photoId);
    foundPhoto.liked = foundPhoto.liked;
    const possibleLiker = foundPhoto.likers.find(currentLiker => currentLiker.login === liker.login);
    if (possibleLiker === undefined) {
      foundPhoto.likers.push(liker);
    } else {
      const newLikers = foundPhoto.likers.filter(currentLiker => currentLiker.login !== liker.login);
      foundPhoto.likers = newLikers;
    }

    return state;
  }

  return state;
}