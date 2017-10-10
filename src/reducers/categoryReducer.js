import * as ActionType from '../actions/actionTypes'

export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}
