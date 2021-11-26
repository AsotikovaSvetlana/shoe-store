import {
  CART_ORDER_CHANGE_FIELD,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_SUCCESS,
  CLEAR_RESPONSE
} from '../actions/actionTypes';

const initialState = {
  owner: {
    phone: '',
    address: '',
    checkbox: ''
  },
  loading: false,
  error: null,
  response: ''
}

export default function orderFormReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ORDER_CHANGE_FIELD:
      const { name, value } = action.payload;
      return {
        ...state,
        owner: {
          ...state.owner,
          [name]: value
        }
      }
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        response: ''
      }
    case FETCH_ORDER_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_ORDER_SUCCESS:
      const { result } = action.payload;
      return {
        ...state,
        owner: {
          phone: '',
          address: '',
          checkbox: ''
        },
        loading: false,
        response: result
      }
    case CLEAR_RESPONSE:
      return {
        ...state,
        response: ''
      }
    default:
      return state;
  }
}