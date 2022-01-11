import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CatalogProvider } from './context/CatalogCtx';
import reportWebVitals from './reportWebVitals';

import './index.scss';

import Home from './pages/Home/Home';
import Books from './pages/Books/Books';
import Movies from './pages/Movies/Movies';
import Book from './pages/Book/Book';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </CatalogProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
