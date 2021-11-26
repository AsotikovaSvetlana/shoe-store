import React from 'react';
import { NavLink } from "react-router-dom";

export default function HeaderNavMenu() {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink 
          end to="/" 
          className="nav-link"
        >
          Главная
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/catalog"
          className="nav-link"
        >
          Каталог
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/about"
          className="nav-link"
        >
          О магазине
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/contacts"
          className="nav-link"
        >
          Контакты
        </NavLink>
      </li>
    </ul>
  )
}
