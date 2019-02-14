export function timeline(state = [], action) {
  if (action.type === 'list') {
    return action.photos;
  }

  if (action.type === 'comnent') {
    const foundPhoto = state.find(photo => photo.id === action.photoId);
    foundPhoto.comments.push(action.comment);
    
    return state;
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