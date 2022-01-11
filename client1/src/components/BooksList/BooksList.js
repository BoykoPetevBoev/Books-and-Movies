import React from 'react';
import { Link } from 'react-router-dom';
import './BooksList.scss'

const BooksList = ({ data }) => {
    return (
        <div className='books-list'>
            {data.map(book => {
                return (
                    <div className='card' key={book._id}>
                        <Link to={`/books/${book._id}`}>
                            <img src={book.image} alt="book" />
                        </Link>

                        <div className='flex'>
                            <div className='rating'>
                                <i className="fas fa-star"></i>
                                <p>{book.rating}</p>
                            </div>

                            {book.favorites
                                ? <i className="fas fa-heart"></i>
                                : <i className="far fa-heart"></i>
                            }
                        </div>

                            <h4>{book.title}</h4>
                        <Link to={`/books/${book._id}`}>Learn More</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default BooksList;