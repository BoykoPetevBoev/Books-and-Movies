import React from 'react';
import './Input.scss';

const Input = ({err, type, value, placeholder, onChange}) => {
    return (
        <div className='input-holder'>
            <p className='error'>{err}</p>
            <div className='input-container'>
                <label htmlFor={type}>{type}</label>
                <input
                    type='text'
                    id={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default Input;