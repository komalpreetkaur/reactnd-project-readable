import { fetchPosts } from '../utils/api'
import * as ActionType from './actionTypes'

export function receivePosts(posts) {
  return {
    type: ActionType.RECEIVE_POSTS,
    posts
  }
}

export function sortBy(sortBy) {
  return {
    type: sortBy,
    sortBy
  }
}

export function addPostAction(post) {
  return {
    type: ActionType.ADD_POST,
    post
  }
}

export function updatePostAction(post) {
  return {
    type: ActionType.UPDATE_POST,
    post
  }
}

export function removePostAction(post) {
  return {
    type: ActionType.REMOVE_POST,
    post
  }
}

export const getPosts = () => dispatch => (
  fetchPosts().then(posts => dispatch(receivePosts(posts)))
)
