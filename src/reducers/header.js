export function notify(state='', action) {
  if (action.type === 'alert') {
    return action.message;
  }

  return state;
}