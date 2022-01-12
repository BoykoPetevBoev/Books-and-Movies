import React, { useCallback, useContext, useState } from 'react';

const BookCtx = React.createContext();

export const useBook = () => {
    return useContext(BookCtx);
};

export const BookProvider = ({ children }) => {

    const [books, setBooks] = useState([]);

    const getBooksData = () => books;
    
    const getBookById = (id) => {
        return books.find(book => book._id === id);
    }

    const setBooksData = useCallback((data) => setBooks(data), []);

    const addNewBook = useCallback((data) => {
        setBooks(oldState => ([...oldState, data]));
    }, []);

    const getFavoritesBooks = () => {
        return books.filter(book => book.favorites);
    }

    const getUnreadBooks = () => {
        const isAllChaptersUnread = (book) => {
            const hasReadedChapter = book.chapters.find(chapter => chapter.isReaded === true);
            return hasReadedChapter ? false : true;
        }
        return books.filter(book => isAllChaptersUnread(book));
    }

    const getReadedBooks = () => {
        const isAllChaptersReaded = (book) => {
            const hasUnreadChapter = book.chapters.find(chapter => chapter.isReaded === false);
            return hasUnreadChapter ? false : true;
        }
        return books.filter(book => isAllChaptersReaded(book));
    }

    const getCurrentlyReadingBooks = () => {
        const hasReadedAndUnreadedChapters = (book) => {
            let hasUnreadChapters = false;
            let hasReadedChapters = false;
            book.chapters.map(chapter => {
                if (chapter.isReaded) hasReadedChapters = true;
                if (!chapter.isReaded) hasUnreadChapters = true;
                return chapter;
            })
            return hasReadedChapters && hasUnreadChapters;
        }
        return books.filter(book => hasReadedAndUnreadedChapters(book));
    }

    const value = {
        setBooksData,
        getBooksData,
        getBookById,
        addNewBook,
        getReadedBooks,
        getUnreadBooks,
        getFavoritesBooks,
        getCurrentlyReadingBooks,
    };

    return (
        <BookCtx.Provider value={value}>
            {children}
        </BookCtx.Provider>
    );
};