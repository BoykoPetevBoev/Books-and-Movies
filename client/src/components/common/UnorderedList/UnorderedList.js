import React from 'react';
import './UnorderedList.scss'

const UnorderedList = ({ array, onClick }) => {
    return (
        <ul className='ul'>
            {array.map(item => (
                <li key={item._id} value={item._id} onClick={() => onClick(item._id)}>
                    {item.name}
                    {item.isReaded || item.isWatched
                        ? <i className="fas fa-check-square"></i>
                        : <i className="far fa-square"></i>
                    }
                </li>
            ))}
        </ul>
    );
};

export default UnorderedList;