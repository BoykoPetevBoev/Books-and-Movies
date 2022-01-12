import React from 'react';
import './Textarea.scss';

const Textarea = ({err, type, value, placeholder, onChange}) => {
    return (
        <div className='textarea-holder'>
            <p className='error'>{err}</p>
            <div className='input-container'>
                <label htmlFor={type}>{type}</label>
                <textarea
                    id={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                ></textarea>
            </div>
        </div>
    );
};

export default Textarea;