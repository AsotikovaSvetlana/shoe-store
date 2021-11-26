import {
  FETCH_PRODUCT_CARD_REQUEST,
  FETCH_PRODUCT_CARD_ERROR,
  FETCH_PRODUCT_CARD_SUCCESS,
  SELECT_PRODUCT_SIZE,
  QUANTITY_PRODUCT_ADD,
  QUANTITY_PRODUCT_DEL,
  ADD_PRODUCT_TO_BASKET
} from '../actions/actionTypes';

const initialState = {
  product: '',
  loadingProduct: false,
  errorProduct: null,
  selectedSize: '',
  quantity: 1
}

export default function productCardReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_CARD_REQUEST:
      return {
        ...state,
        product: '',
        loadingProduct: true,
        errorProduct: null
      }
    case FETCH_PRODUCT_CARD_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        loadingProduct: false,
        errorProduct: error
      }
    case FETCH_PRODUCT_CARD_SUCCESS:
      const { product } = action.payload;
      return {
        ...state,
        product,
        loadingProduct: false
      }
    case SELECT_PRODUCT_SIZE:
      const { size } = action.payload;
      return {
        ...state,
        selectedSize: size
      }
    case QUANTITY_PRODUCT_ADD:
      return {
        ...state,
        quantity: +state.quantity + 1
      }
    case QUANTITY_PRODUCT_DEL:
      return {
        ...state,
        quantity: +state.quantity - 1
      }
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
        selectedSize: '',
        quantity: 1
      }
    default:
      return state;
  }
}