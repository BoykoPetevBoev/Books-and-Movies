import React from 'react';
import CatalogCard from '../CatalogCard/CatalogCard';
import './CatalogList.scss'

const CatalogList = ({ data, title, description, type }) => {
    return (
        <div className='section'>
            <h3>{title}</h3>
            <p>{description}</p>

            <div className='list'>
                {data.map(item => <CatalogCard key={item._id} type={type} item={item} />)}
                {
                    data.length === 0
                        ? <p className='empty'>There is no {type} in this list.</p>
                        : null
                }

            </div>
        </div>
    );
};

export default CatalogList;