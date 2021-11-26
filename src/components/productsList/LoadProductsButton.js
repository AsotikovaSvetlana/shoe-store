import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Preloader';
import ErrorMessage from '../ErrorMessage';

export default function LoadProductsButton(props) {
  const { 
    products,
    loadingMoreProducts, 
    responseProductsAmount, 
    errorMoreProducts
  } = useSelector(state => state.productsList);
  const { handleError, handleLoad } = props;

  if (errorMoreProducts) {
    return (
      <ErrorMessage handleError={handleError}/>
    )
  }

  if (loadingMoreProducts) {
    return (
      <Preloader />
    )
  }
  
  return (
    <>
      {
        products.length >= 6 && 
        responseProductsAmount !== 0 && 
        <div className="text-center load-button">
          <button className="btn btn-outline-primary" onClick={handleLoad}>
            Загрузить ещё
          </button>
        </div>
      }
    </>
  )
}
