import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from '../actions/searchFormActions';
import { fetchProducts } from '../actions/productsListActions';

export default function SearchForm() {
  const { search } = useSelector(state => state.searchForm);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(changeSearchField(value));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.trim() !== '') {
      dispatch(fetchProducts());
    }
  }

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input 
        className="form-control" 
        placeholder="Поиск" 
        value={search} 
        onChange={handleChange}
      />
    </form>
  )
}
