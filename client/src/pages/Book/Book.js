import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { api } from '../../services/requesterService.js'
import { useBook } from '../../context/BookCtx';
import './Book.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AddRating from '../../components/common/AddRating/AddRating.js';
import UnorderedList from '../../components/common/UnorderedList/UnorderedList.js';
import AddToFavorites from '../../components/common/AddToFavorites/AddToFavorites';

const Book = () => {

    const params = useParams();
    const { getBookById } = useBook();

    const [book, setBook] = useState(null);
    const [hasChanges, setHasChanged] = useState(false);

    useEffect(() => {
        setBook(getBookById(params.id));
    }, [getBookById, params])

    const handleRating = (e) => {
        setHasChanged(true);
        setBook(oldState => ({ ...oldState, rating: e.target.value }))
    }

    const handleAddToFavorites = () => {
        setHasChanged(true);
        setBook(oldState => ({ ...oldState, favorites: !oldState.favorites }))
    }

    const handleIsReaded = (id) => {
        setHasChanged(true);
        setBook(oldState => ({
            ...oldState,
            chapters: oldState.chapters.map(chapter => {
                return chapter._id === id
                    ? { ...chapter, isReaded: !chapter.isReaded }
                    : chapter
            })
        }))
    }

    const handleSaveChanges = () => {
        setHasChanged(false)
        api.put('books', book)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    if (!book) return <Header />

    return (
        <div className='book-page-component'>
            <Header />

            <div className='section'>
                <h2>{book.title}</h2>
                <p>{book.description}</p>

                <div className='flex'>
                    <div className='column'>
                        <h3>Chapters</h3>
                        <UnorderedList 
                            array={book.chapters}
                            onClick={handleIsReaded}
                        />
                        <div className='flex'>
                            <AddRating
                                rating={book.rating}
                                onChange={handleRating}
                            />
                            <AddToFavorites
                                isInFavorites={book.favorites}
                                onClick={handleAddToFavorites}
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <img src={book.image} alt='book' />
                    </div>
                </div>

                {hasChanges
                    ? <button className='button' onClick={handleSaveChanges}>Save</button>
                    : null
                }

            </div>

            <Footer />
        </div>
    );
};

export default Book;