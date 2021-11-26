import {
  CART_ORDER_CHANGE_FIELD,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_SUCCESS,
  CLEAR_BASKET,
  CLEAR_RESPONSE
} from './actionTypes';

export function cartOrderChangeField(name, value) {
  return {type: CART_ORDER_CHANGE_FIELD, payload: {name, value}}
}

export function fetchOrderRequest() {
  return {type: FETCH_ORDER_REQUEST}
}

export function fetchOrderError(error) {
  return {type: FETCH_ORDER_ERROR, payload: {error}}
}

export function fetchOrderSuccess(result) {
  return {type: FETCH_ORDER_SUCCESS, payload: {result}}
}

export function clearBasket() {
  return {type: CLEAR_BASKET}
}

export function clearResponse() {
  return {type: CLEAR_RESPONSE}
}

export const sendOrder = () => async (dispatch, getState) => {
  const { orderForm: { owner }, cart: { products } } = getState();
  const order = {
    owner: {
      phone: owner.phone,
      address: owner.address
    },
    items: []
  }

  products.forEach(item => {
    order.items.push({
      id: item.product.id,
      price: item.product.price,
      count: item.quantity
    })
  })

  dispatch(fetchOrderRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(order)
    });

    dispatch(fetchOrderSuccess(response.status));
    dispatch(clearBasket());
  } catch (error) {
    dispatch(fetchOrderError(error.message));
  }
}