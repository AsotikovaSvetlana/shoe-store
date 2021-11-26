import React from 'react';
import { useSelector } from 'react-redux';
import CartTable from '../components/cart/CartTable';
import CartOrderForm from '../components/cart/CartOrderForm';

export default function Cart() {
  const { products } = useSelector(state => state.cart);
  
  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {
          products.length === 0 
          ? 
          <p>В корзине нет товаров</p> 
          :
          <CartTable />
        }
      </section>
      <CartOrderForm />
    </>
  )
}
