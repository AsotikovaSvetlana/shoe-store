import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCardItem from '../components/ProductCardItem';
import { fetchProductCard, selectProductSize, quantityProductAdd, quantityProductDel } from '../actions/productCardActions';
import { addProduct } from '../actions/cartActions';
import Preloader from '../components/Preloader';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductCard() {
  const { product, loadingProduct, errorProduct, quantity } = useSelector(state => state.productCard);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductCard(id));
  }, [dispatch, id])

  const handleChangeSize = (size) => {
    dispatch(selectProductSize(size));
  }

  const handleProductAdd = () => {
    if (quantity < 10) {
      dispatch(quantityProductAdd());
    }
  }

  const handleProductDel = () => {
    if (quantity > 1) {
      dispatch(quantityProductDel());
    }
  }

  const addToBasket = () => {
    dispatch(addProduct());
  }

  const handleError = () => {
    dispatch(fetchProductCard(id));
  }

  if (loadingProduct) {
    return (
      <section className="catalog-item">
        <Preloader />
      </section>
    )
  }

  if (errorProduct) {
    return (
      <section className="catalog-item">
        <ErrorMessage handleError={handleError}/>
      </section>
    )
  }

  return (
    product 
    && 
    <ProductCardItem 
      product={product}
      onChangeSize={handleChangeSize}
      handleProductAdd={handleProductAdd}
      handleProductDel={handleProductDel}
      addToBasket={addToBasket}
    />
  )
}
