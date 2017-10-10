import * as ActionType from '../actions/actionTypes'

const initialState = {
  list: [],
  sortBy: ActionType.SortBy.VOTESCORE
}

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENTS:
      return { ...state, list: action.comments.filter(comment => !comment.parentDeleted && !comment.deleted) }
    case ActionType.SortBy.VOTESCORE:
      return { ...state, sortBy: action.sortBy }
    case ActionType.SortBy.TIMESTAMP:
      return { ...state, sortBy: action.sortBy }
    case ActionType.UPDATE_COMMENT:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (item.id !== action.comment.id) {
            return item;
          }
          return {
            ...item,
            ...action.comment
          }
        })
      }
    case ActionType.REMOVE_COMMENT:
      return {
        ...state,
        list: state.list.filter(comment => comment.id !== action.comment.id)
      }
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        list: [...state.list, action.comment]
      }
    default:
      return state;
  }
}
