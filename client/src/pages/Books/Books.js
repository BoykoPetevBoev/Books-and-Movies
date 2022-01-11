import React, { useEffect } from 'react';
import { api } from '../../services/requesterService.js'
import { useCatalog } from '../../context/CatalogCtx.js';
import './Books.scss'

import BooksForm from '../../components/BooksForm/BooksForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.js';
import BooksList from '../../components/BooksList/BooksList.js';

const Books = () => {

    const {
        setBooksData,
        getFavoritesBooks,
        getReadedBooks,
        getUnreadBooks,
        getCurrentlyReadingBooks } = useCatalog();

    useEffect(() => {
        api.get('books')
            .then(data => setBooksData(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <Header />


            <div className='background'>
                <div className='section'>

                    <h2>Books Catalog</h2>
                    <h3>Recommended</h3>
                    <p>Looking for a new and interesting book to read?</p>
                    <BooksList data={getUnreadBooks()} />

                </div>
            </div>

            <div className='background'>
                <div className='section'>
                    <h3>Favorites</h3>
                    <p>This list shows all the books you have added to favorites. If you want to change it please go to the book you want and check the "favorites" box.</p>
                    <BooksList data={getFavoritesBooks()} />
                </div>
            </div>

            <div className='background'>
                <div className='section'>
                    <h3>You are currently reading</h3>
                    <p>This list contains the books you are currently reading.</p>
                    <BooksList data={getCurrentlyReadingBooks()} />

                </div>
            </div>

            <div className='background'>
                <div className='section'>
                    <h3>Readed books</h3>
                    <p>All the books you have already read can be viewed in this section.</p>
                    <BooksList data={getReadedBooks()} />

                </div>
            </div>

            <div className='background'>
                <div className='section'>
                    <h3>Book Form</h3>
                    <p>Please feel free to add your favourite book if you do not see it in the catalog.</p>
                    <BooksForm />
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default Books;   