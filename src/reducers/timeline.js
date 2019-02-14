export function timeline(state = [], action) {
  if (action.type === 'list') {
    return action.photos;
  }

  if (action.type === 'comnent') {
    const photoId = action.photoId;
    const comment = action.comment;
    
    const foundPhoto = state.find(photo => photo.id === photoId);
    foundPhoto.comments.push(comment);
    
    return state;
  }

  return state;
}