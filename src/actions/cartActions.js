import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  CALC_TOTAL_AMOUNT
} from './actionTypes';

export function addProductToBasket(product, selectedSize, quantity) {
  return {type: ADD_PRODUCT_TO_BASKET, payload: {product, selectedSize, quantity}}
}

export function removeProductFromBasket(id, size) {
  return {type: REMOVE_PRODUCT_FROM_BASKET, payload: {id, size}}
}

export function calcTotalAmount() {
  return {type: CALC_TOTAL_AMOUNT}
}

export const addProduct = () => (dispatch, getState) => {
  const { productCard: { product, selectedSize, quantity } } = getState();
  
  dispatch(addProductToBasket(product, selectedSize, quantity));
  dispatch(calcTotalAmount());
}

export const removeProduct = (id, size) => (dispatch) => {
  dispatch(removeProductFromBasket(id, size));
  dispatch(calcTotalAmount());
}