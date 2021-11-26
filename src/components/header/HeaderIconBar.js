import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from '../../actions/searchFormActions';

export default function HeaderIconBar() {
  const [toggle, setToggle ] = useState(false);
  const [search, setSearch ] = useState('');
  const { amount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  }

  const handleToggle = () => {
    setToggle(toggle => (!toggle));
  }

  const handleClick = () => {
    navigate("/cart");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeSearchField(search));
    setToggle(false);
    setSearch('');
    navigate("/catalog");
  }

  return (
    <div>
      <div className="header-controls-pics">
        <div 
          data-id="search-expander" 
          className="header-controls-pic header-controls-search"
          onClick={handleToggle}
        ></div>
        <div 
          className="header-controls-pic header-controls-cart" 
          onClick={handleClick}
        >
          {
            amount ? <div className="header-controls-cart-full">{amount}</div> : null
          }
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <form 
        data-id="search-form" 
        className={toggle ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible"} 
        onSubmit={handleSubmit}
      >
        <input 
          className="form-control" 
          name="search" 
          placeholder="Поиск" 
          ref={input => input && input.focus()} 
          value={search} 
          onChange={handleChange}
        />
      </form>
    </div>
  )
}
