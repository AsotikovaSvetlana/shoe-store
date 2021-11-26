import {
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_ERROR,
  FETCH_TOP_SALES_SUCCESS,
} from './actionTypes';

export function fetchTopSalesRequest() {
  return {type: FETCH_TOP_SALES_REQUEST}
}

export function fetchTopSalesError(error) {
  return {type: FETCH_TOP_SALES_ERROR, payload: {error}}
}

export function fetchTopSalesSuccess(items) {
  return {type: FETCH_TOP_SALES_SUCCESS, payload: {items}}
}

export const fetchTopSales = () => async (dispatch) => {
  dispatch(fetchTopSalesRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/top-sales`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const items = await response.json();
    dispatch(fetchTopSalesSuccess(items));
  } catch (error) {
    dispatch(fetchTopSalesError(error.message));
  }
}