import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import topSalesReducer from '../reducers/topSalesReducer';
import productsListReducer from '../reducers/productsListReducer';
import searchFormReducer from '../reducers/searchFormReducer';
import productCardReducer from '../reducers/productCardReducer';
import cartReducer from '../reducers/cartReducer';
import orderFormReducer from '../reducers/orderFormReducer';
import { loadState, saveState } from '../localStorage/localStorage';

const persistedState = loadState();

const reducer = combineReducers({
  topSales: topSalesReducer,
  productsList: productsListReducer,
  searchForm: searchFormReducer,
  productCard: productCardReducer,
  cart: cartReducer,
  orderForm: orderFormReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, 
  persistedState, 
  composeEnhancers(
  applyMiddleware(thunk)
  ),
);

store.subscribe(() => {
  saveState(store.getState().cart);
})

export default store;