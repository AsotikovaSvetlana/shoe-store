import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTabMenu, changeActiveTab } from '../../actions/productsListActions';
import TabMenuItem from './TabMenuItem';

export default function TabMenu() {
  const { 
    categories, 
    loadingCategories, 
    errorCategories, 
    activeCategory 
  } = useSelector(state => state.productsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTabMenu());
  }, [dispatch])

  const handleChangeCategory = (id) => {
    dispatch(changeActiveTab(id));
  }

  return (
    <>
      {
        !loadingCategories &&
        !errorCategories &&
        <ul className="catalog-categories nav justify-content-center">
          {
            categories.map(category => 
              <TabMenuItem 
                key={category.id} 
                activeCategory={activeCategory} 
                category={category} 
                onChangeCategory={handleChangeCategory}
              />
            )
          }
        </ul>
      }
    </>
  )
}
