import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.scss';

import { BookProvider } from './context/BookCtx';
import { MovieProvider } from './context/MovieCtx';

import Home from './pages/Home/Home';
import Book from './pages/Book/Book';
import Books from './pages/Books/Books';
import Movies from './pages/Movies/Movies';
import Movie from './pages/Movie/Movie';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BookProvider>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Movie />} />
          </Routes>
        </MovieProvider>
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
