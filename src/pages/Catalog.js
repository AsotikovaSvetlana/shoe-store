import React from 'react';
import TabMenu from '../components/tabMenu/TabMenu';
import ProductsList from '../components/productsList/ProductsList';
import CatalogSearchForm from '../components/CatalogSearchForm';

export default function Catalog() {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CatalogSearchForm />
      <TabMenu />
      <ProductsList />
    </section>
  )
}
