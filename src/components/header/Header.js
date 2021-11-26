import React from 'react';
import { Link } from "react-router-dom";
import headerLogo from '../../img/header-logo.png';
import HeaderNavMenu from './HeaderNavMenu';
import HeaderIconBar from './HeaderIconBar';

export default function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link 
              to="/" 
              className="navbar-brand"
            >
              <img src={headerLogo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <HeaderNavMenu />
              <HeaderIconBar />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
