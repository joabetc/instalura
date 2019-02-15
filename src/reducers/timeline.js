import {List} from 'immutable';

function changePhoto(list, photoId, updatePropertiesCallback) {
  const oldStatePhoto = list.find(photo => photo.id === photoId);
  
  const newProperties = updatePropertiesCallback(oldStatePhoto);
  const newStatePhoto = Object.assign({}, oldStatePhoto, newProperties);
  const listIndex = list.findIndex(photo => photo.id === photoId);

  return list.set(listIndex, newStatePhoto);
}

export function timeline(state = [], action) {
  if (action.type === 'list') {
    return List(action.photos);
  }

  if (action.type === 'comnent') {
    return changePhoto(state, action.photoId, oldStatePhoto => {
      const newComments = oldStatePhoto.comments.concat(action.comment);
      return {comments: newComments};
    });
  }

  if (action.type === 'like') {

    return changePhoto(state, action.photoId, oldStatePhoto => {
      const liked = !oldStatePhoto.liked;

      const liker = action.liker;
      const possibleLiker = oldStatePhoto.likers.find(currentLiker => currentLiker.login === liker.login);
  
      let newLikers;
      if (possibleLiker === undefined) {
        newLikers =  oldStatePhoto.likers.push(liker);
      } else {
        newLikers = oldStatePhoto.likers.filter(currentLiker => currentLiker.login !== liker.login);
      }

      return {liked, likers: newLikers};
    });
  }

  return state;
}