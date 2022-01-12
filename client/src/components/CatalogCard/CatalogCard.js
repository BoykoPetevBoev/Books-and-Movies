import React from 'react';
import { Link } from 'react-router-dom';
import './CatalogCard.scss'

const CatalogCard = ({item, type}) => {
    return (
        <div className='card' key={item._id}>
            <Link to={`/${type}/${item._id}`}>
                <img src={item.image} alt="item" />
            </Link>

            <div className='flex'>
                <div className='rating'>
                    <i className="fas fa-star"></i>
                    <p>{item.rating}</p>
                </div>

                {item.favorites
                    ? <i className="fas fa-heart"></i>
                    : <i className="far fa-heart"></i>
                }
            </div>

            <h4>{item.title}</h4>

            <Link to={`/${type}/${item._id}`}>Learn More</Link>
        </div>
    );
};

export default CatalogCard;