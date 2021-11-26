import {
  CHANGE_SEARCH_FIELD
} from '../actions/actionTypes';

const initialState = {
  search: ''
}

export default function searchFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      const { value } = action.payload;
      return {...state, search: value};
    default:
      return state;
  }
}