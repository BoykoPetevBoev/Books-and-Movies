import React, { useState } from 'react';
import './BooksForm.scss'
import { api } from '../../services/requesterService.js';
import { useCatalog } from '../../context/CatalogCtx';

const BooksForm = () => {

    const { addNewBook } = useCatalog();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [chapters, setChapters] = useState('');

    const [errTitle, setErrTitle] = useState(null);
    const [errImage, setErrImage] = useState(null);
    const [errDescription, setErrDescription] = useState(null);
    const [errChapters, setErrChapters] = useState(null);

    const isInvalid = () => {
        setErrTitle(null);
        setErrImage(null);
        setErrDescription(null);
        setErrChapters(null);

        let result = false;
        if (title === '') {
            setErrTitle('Invalid title!');
            result = true;
        }
        if (image === '') {
            setErrImage('Invalid image!');
            result = true;
        }
        if (description === '') {
            setErrDescription('Invalid description!');
            result = true;
        }
        if (chapters === '') {
            setErrChapters('Invalid book capters!');
            result = true;
        }
        return result;
    };

    const handleResponse = (data) => {
        setTitle('');
        setDescription('');
        setImage('');
        setChapters('');

        addNewBook(data);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (isInvalid()) return;

        const bookData = {
            title,
            image,
            description,
            chapters: chapters.split('\n')
        }

        api.post('books', bookData)
            .then(data => handleResponse(data))
            .catch(err => console.error(err))
    }

    return (
        <form className='books-form' onSubmit={onSubmit}>

            <p className='error'>{errTitle}</p>
            <div className='input-container'>
                <label htmlFor="title">Title</label>
                <input
                    type='text'
                    id="title"
                    value={title}
                    placeholder='Enter your book name'
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <p className='error'>{errImage}</p>
            <div className='input-container'>
                <label htmlFor='image'>Image</label>
                <input
                    type='text'
                    id='image'
                    value={image}
                    placeholder='Enter image URL address'
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            <p className='error'>{errDescription}</p>
            <div className='input-container'>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    value={description}
                    placeholder='Book description'
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            <p className='error'>{errChapters}</p>
            <div className='input-container'>
                <label htmlFor='chapters'>Book Chapters</label>
                <textarea
                    id='chapters'
                    value={chapters}
                    placeholder='Add book chapters each on a new line'
                    onChange={(e) => setChapters(e.target.value)}
                ></textarea>
            </div>

            <button className='button' type='submit'>Submit</button>
        </form>
    );
};

export default BooksForm;