import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopSalesItem from './TopSalesItem';
import { fetchTopSales } from '../../actions/topSalesActions';
import Preloader from '../Preloader';
import ErrorMessage from '../ErrorMessage';

export default function TopSalesList() {
  const { items, loading, error } = useSelector(state => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch])

  const handleError = () => {
    dispatch(fetchTopSales());
  }

  if (items.length === 0 && !loading && !error) {
    return (
      <div className="row"></div>
    )
  }

  if (error) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <ErrorMessage handleError={handleError}/>
      </section>
    )
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {
        loading 
        ? 
        <Preloader /> 
        :
        <div className="row">
          {
            items.map(item => <TopSalesItem key={item.id} item={item}/>)
          }
        </div>
      }
    </section>
  )
}
