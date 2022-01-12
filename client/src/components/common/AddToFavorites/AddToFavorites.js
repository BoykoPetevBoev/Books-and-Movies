import React from 'react';
import './AddToFavorites.scss';

const AddToFavorites = ({ isInFavorites, onClick }) => {
    return (
        <div className='favorites' onClick={onClick}>
            {isInFavorites
                ? <i className="fas fa-heart"></i>
                : <i className="far fa-heart"></i>
            }
            {isInFavorites
                ? <p>In Favorites</p>
                : <p>Add to Favorites</p>
            }
        </div>
    );
};

export default AddToFavorites;