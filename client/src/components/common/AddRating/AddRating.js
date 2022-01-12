import React from 'react';
import './AddRating.scss'

const AddRating = ({rating, onChange}) => {
    return (
        <div className='add-rating'>
            <i className="fas fa-star"></i>
            <p>Rating</p>
            <input value={rating} onChange={onChange} min="0" max="10" type='number' />
        </div>
    );
};

export default AddRating;