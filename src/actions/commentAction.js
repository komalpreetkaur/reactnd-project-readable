import * as ActionType from './actionTypes'

export function receivePostComments(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    comments
  }
}

export function addCommentAction(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    comment
  }
}

export function updateCommentAction(comment) {
  return {
    type: ActionType.UPDATE_COMMENT,
    comment
  }
}

export function removeCommentAction(comment) {
  return {
    type: ActionType.REMOVE_COMMENT,
    comment
  }
}
