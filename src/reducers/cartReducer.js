import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  CALC_TOTAL_AMOUNT,
  CLEAR_BASKET
} from '../actions/actionTypes';

const initialState = {
  products: [],
  amount: ''
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      const { product, selectedSize, quantity } = action.payload;
      if (state.products.some(item => item.product.id === product.id && item.selectedSize === selectedSize)) {
        return {
          ...state,
          products: state.products.map(item => {
            if (item.selectedSize === selectedSize && item.product.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + quantity
              }
            }
            return item;
          })
        } 
      } else {
        return {
          ...state,
          products: [
              ...state.products, 
              {
                product,
                selectedSize,
                quantity
              }
          ]
        }
      }
    case REMOVE_PRODUCT_FROM_BASKET:
      const { id, size } = action.payload;
      return {
        ...state,
        products: state.products.filter(item => item.product.id !== id || item.selectedSize !== size)
      }
    case CALC_TOTAL_AMOUNT:
      return {
        ...state,
        amount: state.products.reduce((sum, item) => sum + item.quantity, 0)
      }
    case CLEAR_BASKET:
      return {
        ...initialState
      }
    default:
      return state;
  }
}