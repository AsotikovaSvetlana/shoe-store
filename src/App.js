import './css/styles.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Main from './pages/Main';
import Page404 from './pages/Page404';
import ProductCard from './pages/ProductCard';
import Contacts from './pages/Contacts';
import Header from './components/header/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:id" element={<ProductCard />} />
              <Route path="*" element={<Page404 />} />
            </Routes> 
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
