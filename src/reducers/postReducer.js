import * as ActionType from '../actions/actionTypes'

const initialState = {
  list: [],
  sortBy: ActionType.SortBy.VOTESCORE
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_POSTS:
      return { ...state, list: action.posts.filter(post => post.deleted !== true) }
    case ActionType.SortBy.VOTESCORE:
      return { ...state, sortBy: action.sortBy }
    case ActionType.SortBy.TIMESTAMP:
      return { ...state, sortBy: action.sortBy }
    case ActionType.UPDATE_POST:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (item.id !== action.post.id) {
            return item;
          }
          return {
            ...item,
            ...action.post
          }
        })
      }
    case ActionType.REMOVE_POST:
      return {
        ...state,
        list: state.list.filter(post => post.id !== action.post.id)
      }
    case ActionType.ADD_POST:
      return {
        ...state,
        list: [...state.list, action.post]
      }
    default:
      return state;
  }
}
