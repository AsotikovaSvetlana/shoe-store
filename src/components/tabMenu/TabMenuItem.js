import React from 'react';

export default function TabMenuItem(props) {
  const { category, activeCategory, onChangeCategory } = props;

  const handleChangeCategory = (event) => {
    event.preventDefault();
    onChangeCategory(category.id);
  }

  return (
    <li className="nav-item">
      <a 
        className={activeCategory === category.id ? "nav-link active" : "nav-link"} 
        href="/#" 
        onClick={handleChangeCategory}
      >
        {category.title}
      </a>
    </li>
  )
}
