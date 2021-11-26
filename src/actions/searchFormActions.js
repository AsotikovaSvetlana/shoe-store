import {
  CHANGE_SEARCH_FIELD
} from './actionTypes';

export function changeSearchField(value) {
  return {type: CHANGE_SEARCH_FIELD, payload: {value}}
}