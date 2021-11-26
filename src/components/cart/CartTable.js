import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProduct } from '../../actions/cartActions';
import { nanoid } from 'nanoid';

export default function CartTable() {
  const { products } = useSelector(state => state.cart);
  const { loading } = useSelector(state => state.orderForm);
  const dispatch = useDispatch();

  const handleRemove = (id, size) => {
    dispatch(removeProduct(id, size));
  }

  const totalPrice = (products) => {
    return products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
  
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {
          products
            .map((item, i) =>
              <tr key={nanoid()}>
                <th scope="row">{i + 1}</th>
                <td>
                  <Link to={`/catalog/${item.product.id}`}>{item.product.title}</Link>
                </td>
                <td>{item.selectedSize}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price}</td>
                <td>{item.product.price * item.quantity}</td>
                <td>
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    disabled={loading}
                    onClick={() => handleRemove(item.product.id, item.selectedSize)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            )
        }
        <tr>
          <td colSpan="5" className="text-right">Общая стоимость</td>
          <td>{totalPrice(products)}</td>
        </tr>
      </tbody>
    </table>
  )
}
