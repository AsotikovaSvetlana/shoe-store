import {
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_ERROR,
  FETCH_TOP_SALES_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_SALES_REQUEST:
      return {
        ...initialState,
        loading: true
      };
    case FETCH_TOP_SALES_ERROR:
      const {error} = action.payload;
      return {
        ...initialState,
        error
      };
    case FETCH_TOP_SALES_SUCCESS:
      const {items} = action.payload;
      return {
        ...initialState, 
        items
      };
    default:
      return state;
  }
}