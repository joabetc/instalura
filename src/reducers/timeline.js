export function timeline(state = [], action) {
  if (action.type === 'list') {
    return action.photos;
  }

  return state;
}