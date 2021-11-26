import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartOrderChangeField, sendOrder, clearResponse } from '../../actions/orderFormActions';
import Preloader from '../Preloader';
import ErrorMessage from '../ErrorMessage';

export default function CartOrderForm() {
  const { products } = useSelector(state => state.cart);
  const { 
    owner: { 
      phone, 
      address, 
      checkbox 
    }, 
    loading, 
    error, 
    response 
  } = useSelector(state => state.orderForm);
  const dispatch = useDispatch();
  const disabled = products.length === 0;

  useEffect(() => {
    setTimeout(() => dispatch(clearResponse()), 15000);
  }, [dispatch, response])

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(cartOrderChangeField(name, value));
  }

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    dispatch(cartOrderChangeField(name, checked));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendOrder());
  }

  const handleError = () => {
    dispatch(sendOrder());
  }

  if (error) {
    return (
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <ErrorMessage handleError={handleError}/>
      </section>
    )
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      {response && <span>Заказ успешно отправлен</span>}
      {
        loading 
        ? 
        <Preloader /> 
        :
        <div className="card" style={{maxWidth: "30rem", margin: "0 auto"}}>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input 
                className="form-control" 
                id="phone" 
                placeholder="+7xxxxxxxxxxx" 
                name="phone" 
                required
                disabled={disabled}
                value={phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input 
                className="form-control" 
                id="address" 
                placeholder="Адрес доставки" 
                name="address"
                required
                disabled={disabled}
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-check">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="agreement" 
                name="checkbox"
                disabled={disabled}
                checked={checkbox}
                onChange={handleCheckbox}
              />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button 
              type="submit" 
              className="btn btn-outline-secondary" 
              disabled={disabled || !checkbox}
            >
              Оформить
            </button>
          </form>
        </div>
      }
    </section>
  )
}
