import React, { useEffect } from 'react';
import { api } from '../../services/requesterService.js'
import { useBook } from '../../context/BookCtx.js';
import './Books.scss'
import BooksForm from '../../components/forms/BooksForm/BooksForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.js';
import CatalogList from '../../components/CatalogList/CatalogList.js';

const Books = () => {

    const {
        setBooksData,
        getFavoritesBooks,
        getReadedBooks,
        getUnreadBooks,
        getCurrentlyReadingBooks } = useBook();

    useEffect(() => {
        api.get('books')
            .then(data => setBooksData(data))
            .catch(err => console.error(err))
    }, [setBooksData])

    return (
        <div className='books-page-component'>
            <Header />

            <div className='background'>
                <h2>Books Catalog</h2>
                <CatalogList
                    data={getUnreadBooks()}
                    title="Recommended"
                    description="Looking for a new and interesting book to read?"
                    type="books"
                />
            </div>

            <div className='background'>
                <CatalogList
                    data={getFavoritesBooks()}
                    title="Favorites"
                    description="This list shows all the books you have added to favorites. If you want to change it please go to the book you want and check the 'favorites' box."
                    type="books"
                />
            </div>

            <div className='background'>
                <CatalogList
                    data={getCurrentlyReadingBooks()}
                    title="You are currently reading"
                    description="This list contains the books you are currently reading."
                    type="books"
                />
            </div>

            <div className='background'>
                <CatalogList
                    data={getReadedBooks()}
                    title="Readed books"
                    description="All the books you have already read can be viewed in this section."
                    type="books"
                />
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