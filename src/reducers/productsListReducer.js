import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_TAB_MENU_REQUEST,
  FETCH_TAB_MENU_ERROR,
  FETCH_TAB_MENU_SUCCESS,
  CHANGE_ACTIVE_TAB,
  LOAD_MORE_PRODUCTS_REQUEST,
  LOAD_MORE_PRODUCTS_ERROR,
  LOAD_MORE_PRODUCTS_SUCCESS,
  RESPONSE_PRODUCTS_AMOUNT
} from '../actions/actionTypes';

const initialState = {
  products: [],
  loadingProducts: false,
  errorProducts: null,
  controller: new AbortController(),
  loadingMoreProducts: false,
  errorMoreProducts: null,
  categories: [{id: 0, title: 'Все'}],
  activeCategory: 0,
  loadingCategories: false,
  errorCategories: null,
  responseProductsAmount: 0
}

export default function productsListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TAB_MENU_REQUEST:
      return {
        ...state,
        categories: [{id: 0, title: 'Все'}],
        activeCategory: 0,
        loadingCategories: true, 
        errorCategories: null
      }
    case FETCH_TAB_MENU_ERROR:
      const { error: errorCategories } = action.payload;
      return {
        ...state,
        loadingCategories: false,
        errorCategories,
      }
    case FETCH_TAB_MENU_SUCCESS:
      const { categories } = action.payload;
      return {
        ...state, 
        categories: [...initialState.categories, ...categories], 
        loadingCategories: false
      }
    case CHANGE_ACTIVE_TAB:
      const { id } = action.payload;
      return {
        ...state,
        activeCategory: id
      }
    case FETCH_PRODUCTS_REQUEST:
      const { controller } = action.payload;
      return {
        ...state,
        products: [],
        loadingProducts: true,
        errorProducts: null,
        controller
      }
    case FETCH_PRODUCTS_ERROR:
      const { error: errorProducts } = action.payload;
      return {
        ...state,
        loadingProducts: false,
        errorProducts 
      }
    case FETCH_PRODUCTS_SUCCESS:
      const { products } = action.payload;
      return {
        ...state,
        products,
        loadingProducts: false
      }
    case LOAD_MORE_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingMoreProducts: true,
        errorMoreProducts: null
      }
    case LOAD_MORE_PRODUCTS_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        loadingMoreProducts: false,
        errorMoreProducts: error
      }
    case LOAD_MORE_PRODUCTS_SUCCESS:
      const { items } = action.payload;
      return {
        ...state,
        products: [...state.products, ...items],
        loadingMoreProducts: false
      }
    case RESPONSE_PRODUCTS_AMOUNT:
      const { amount } = action.payload;
      return {
        ...state,
        responseProductsAmount: amount
      }
    default:
      return state;
  }
}