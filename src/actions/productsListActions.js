import {
  FETCH_TAB_MENU_REQUEST,
  FETCH_TAB_MENU_ERROR,
  FETCH_TAB_MENU_SUCCESS,
  CHANGE_ACTIVE_TAB,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_REQUEST,
  LOAD_MORE_PRODUCTS_ERROR,
  LOAD_MORE_PRODUCTS_SUCCESS,
  RESPONSE_PRODUCTS_AMOUNT
} from './actionTypes';

// Tab Menu
export function fetchTabMenuRequest() {
  return {type: FETCH_TAB_MENU_REQUEST}
}

export function fetchTabMenuError(error) {
  return {type: FETCH_TAB_MENU_ERROR, payload: {error}}
}

export function fetchTabMenuSuccess(categories) {
  return {type: FETCH_TAB_MENU_SUCCESS, payload: {categories}}
}

export function changeActiveTab(id) {
  return {type: CHANGE_ACTIVE_TAB, payload: {id}}
}

export const fetchTabMenu = () => async (dispatch) => {
  dispatch(fetchTabMenuRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const categories = await response.json();
    dispatch(fetchTabMenuSuccess(categories));
  } catch (error) {
    dispatch(fetchTabMenuError(error.message));
  }
}

// Products List
export function fetchProductsRequest(controller) {
  return {type: FETCH_PRODUCTS_REQUEST, payload: {controller}}
}

export function fetchProductsError(error) {
  return {type: FETCH_PRODUCTS_ERROR, payload: {error}}
}

export function fetchProductsSuccess(products) {
  return {type: FETCH_PRODUCTS_SUCCESS, payload: {products}}
}

export function responseProductsAmount(amount) {
  return {type: RESPONSE_PRODUCTS_AMOUNT, payload: {amount}}
}

export const fetchProducts = () => async (dispatch, getState) => {
  const { productsList: { controller, activeCategory }, searchForm: { search } } = getState();
  
  controller.abort();
  const newController = new AbortController();

  dispatch(fetchProductsRequest(newController));

  try {
    let response;

    if (search.length !== 0) {
      response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${activeCategory}&q=${search}`, {
        signal: newController.signal
      });
    } else {
      response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${activeCategory}`, {
        signal: newController.signal
      });
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const products = await response.json();
    dispatch(fetchProductsSuccess(products));
    dispatch(responseProductsAmount(products.length));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
}

// Load more products
export function loadMoreProductsRequest(amount) {
  return {type: LOAD_MORE_PRODUCTS_REQUEST, payload: {amount}}
}

export function loadMoreProductsError(error) {
  return {type: LOAD_MORE_PRODUCTS_ERROR, payload: {error}}
}

export function loadMoreProductsSuccess(items) {
  return {type: LOAD_MORE_PRODUCTS_SUCCESS, payload: {items}}
}

export const loadMoreProducts = (amount) => async (dispatch, getState) => {
  const { productsList: { activeCategory }, searchForm: { search } } = getState();

  dispatch(loadMoreProductsRequest());

  try {
    let response;

    if (search.length !== 0) {
      response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${activeCategory}&offset=${amount}&q=${search}`);
    } else {
      response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${activeCategory}&offset=${amount}`);
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const items = await response.json();
    dispatch(loadMoreProductsSuccess(items));
    dispatch(responseProductsAmount(items.length));
  } catch (error) {
    dispatch(loadMoreProductsError(error.message));
  }
}
