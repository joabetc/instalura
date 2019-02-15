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
    const oldStatePhoto = state.find(photo => photo.id === action.photoId);
    oldStatePhoto.liked = oldStatePhoto.liked;
    const possibleLiker = oldStatePhoto.likers.find(currentLiker => currentLiker.login === liker.login);

    let newLikers;
    if (possibleLiker === undefined) {
      newLikers =  oldStatePhoto.likers.push(liker);
    } else {
      newLikers = oldStatePhoto.likers.filter(currentLiker => currentLiker.login !== liker.login);
    }

    const newStatePhoto = Object.assign({}, oldStatePhoto, {likers: newLikers});
    const listIndex = state.findIndex(photo => photo.id === action.photoId);

    const newList = state.set(listIndex, newStatePhoto);

    return newList;
  }

  return state;
}