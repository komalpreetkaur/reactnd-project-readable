import { fetchCategories } from '../utils/api'
import * as ActionType from './actionTypes'

export function receiveCategories(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    categories
  }
}

export const getCategories = () => dispatch => (
  fetchCategories().then(
    response => dispatch(receiveCategories(response.categories))
  )
)
