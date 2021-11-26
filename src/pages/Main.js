import React from 'react';
import TopSalesList from '../components/topSales/TopSalesList';
import TabMenu from '../components/tabMenu/TabMenu';
import ProductsList from '../components/productsList/ProductsList';

export default function Main() {
  return (
    <>
      <TopSalesList />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <TabMenu />
        <ProductsList />
      </section>
    </>
  )
}
