import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, loadMoreProducts } from '../../actions/productsListActions';
import { fetchTabMenu } from '../../actions/productsListActions';
import ProductsListItem from './ProductsListItem';
import Preloader from '../Preloader';
import ErrorMessage from '../ErrorMessage';
import LoadProductsButton from './LoadProductsButton';

export default function ProductsList() {
  const { 
    products, 
    loadingProducts, 
    activeCategory, 
    responseProductsAmount, 
    loadingCategories, 
    errorProducts, 
    errorCategories,
    errorMoreProducts
  } = useSelector(state => state.productsList);
  const { search } = useSelector(state => state.searchForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, activeCategory])

  const handleLoad = () => {
    dispatch(loadMoreProducts(products.length));
  }

  const handleError = () => {
    if (errorProducts) {
      dispatch(fetchProducts());
    }
    
    if (errorCategories) {
      dispatch(fetchTabMenu());
    }

    if (errorMoreProducts) {
      dispatch(loadMoreProducts(products.length));
    }
  }

  if (loadingProducts || loadingCategories) {
    return (
      <Preloader />
    )
  }

  if (errorCategories || errorProducts) {
    return (
      <ErrorMessage handleError={handleError}/>
    )
  }

  return (
    <div className="row">
      {responseProductsAmount === 0 && search && <p>Ничего не найдено</p>}
      { 
        products.map(product => <ProductsListItem key={product.id} product={product}/>)
      }
      <LoadProductsButton handleLoad={handleLoad} handleError={handleError}/>
    </div>
  )
}
