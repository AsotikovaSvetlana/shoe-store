import {
  FETCH_PRODUCT_CARD_REQUEST,
  FETCH_PRODUCT_CARD_ERROR,
  FETCH_PRODUCT_CARD_SUCCESS,
  SELECT_PRODUCT_SIZE,
  QUANTITY_PRODUCT_ADD,
  QUANTITY_PRODUCT_DEL
} from './actionTypes';

export function fetchProductCardRequest() {
  return {type: FETCH_PRODUCT_CARD_REQUEST}
}

export function fetchProductCardError(error) {
  return {type: FETCH_PRODUCT_CARD_ERROR, payload: {error}}
}

export function fetchProductCardSuccess(product) {
  return {type: FETCH_PRODUCT_CARD_SUCCESS, payload: {product}}
}

export function selectProductSize(size) {
  return {type: SELECT_PRODUCT_SIZE, payload: {size}}
}

export function quantityProductAdd() {
  return {type: QUANTITY_PRODUCT_ADD}
}

export function quantityProductDel() {
  return {type: QUANTITY_PRODUCT_DEL}
}

export const fetchProductCard = (id) => async (dispatch) => {
  dispatch(fetchProductCardRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const product = await response.json();
    dispatch(fetchProductCardSuccess(product));
  } catch (error) {
    dispatch(fetchProductCardError(error.message));
  }
}