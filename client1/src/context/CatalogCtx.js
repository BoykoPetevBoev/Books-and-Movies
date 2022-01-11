import React, { useContext, useState } from 'react';

const CatalogCtx = React.createContext();

export const useCatalog = () => {
    return useContext(CatalogCtx);
};

export const CatalogProvider = ({ children }) => {

    const [books, setBooks] = useState([]);
    // const [movies, setMovies] = useState([]);

    const setBooksData = (data) => {
        setBooks(data);
    }

    const addNewBook = (data) => {
        setBooks(oldState => ([...oldState, data]))
    }

    const getBooksData = () => {
        return books
    }

    const getFavoritesBooks = () => {
        return books.filter(book => book.favorites)
    }

    const getUnreadBooks = () => {
        const isAllChaptersUnread = (book) => {
            const hasReadedChapter = book.chapters.find(chapter => chapter.isReaded === true);
            return hasReadedChapter ? false : true;
        }
        return books.filter(book => isAllChaptersUnread(book))
    }

    const getReadedBooks = () => {
        const isAllChaptersReaded = (book) => {
            const hasUnreadChapter = book.chapters.find(chapter => chapter.isReaded === false);
            return hasUnreadChapter ? false : true;
        }
        return books.filter(book => isAllChaptersReaded(book))
    }
    
    const getCurrentlyReadingBooks = () => {
        const hasReadedAndUnreadedChapters = (book) => {
            let hasUnreadChapters = false;
            let hasReadedChapters = false;
            book.chapters.map(chapter => {
                if(chapter.isReaded) hasReadedChapters = true;
                if(!chapter.isReaded) hasUnreadChapters= true;
            })
            return hasReadedChapters && hasUnreadChapters
        }
        return books.filter(book => hasReadedAndUnreadedChapters(book))
    }

    const getBookById = (id) => {
        return books.find(book => book._id === id);
    }

    const value = {
        setBooksData,
        getBooksData,
        addNewBook,
        getFavoritesBooks,
        getBookById,
        getReadedBooks,
        getUnreadBooks,
        getCurrentlyReadingBooks,
    };

    return (
        <CatalogCtx.Provider value={value}>
            {children}
        </CatalogCtx.Provider>
    );
};