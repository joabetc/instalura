export function list(photos) {
  return {type: 'list', photos};
}

export function comments(photoId, comment) {
  return {type: 'comment', photoId, comment}
}

export function like(photoId, liker) {
  return {type: 'like', photoId, liker};
}

export function notify(message) {
  return {type: 'alert', message};
}