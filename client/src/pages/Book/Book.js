import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { api } from '../../services/requesterService.js'
import { useCatalog } from '../../context/CatalogCtx';
import Header from '../../components/Header/Header';

import './Book.scss'
import Footer from '../../components/Footer/Footer';

const Book = () => {

    const params = useParams();
    const { getBookById } = useCatalog();

    const [book, setBook] = useState(null);
    const [hasChanges, setHasChanged] = useState(false);

    useEffect(() => {
        setBook(getBookById(params.id));
    }, [])

    if (!book) {
        return <Header />
    }

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

    return (
        <div className='book-page-component'>
            <Header />

            <div className='section'>
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <div className='flex'>
                    <div className='column'>

                        <h3>Chapters</h3>
                        <ul>
                            {
                                book.chapters.map(chapter => {
                                    return (
                                        <li key={chapter._id} value={chapter._id} onClick={() => handleIsReaded(chapter._id)}>
                                            {chapter.name}
                                            {chapter.isReaded
                                                ? <i className="fas fa-check-square"></i>
                                                : <i className="far fa-square"></i>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <div className='flex'>

                            <div className='rating'>
                                <i className="fas fa-star"></i>
                                <input value={book.rating} onChange={handleRating} min="0" max="10" type='number' />
                            </div>

                            <div className='favorites' onClick={handleAddToFavorites}>
                                {book.favorites
                                    ? <i className="fas fa-heart"></i>
                                    : <i className="far fa-heart"></i>
                                }
                                <p>Add to favorites</p>
                            </div>
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