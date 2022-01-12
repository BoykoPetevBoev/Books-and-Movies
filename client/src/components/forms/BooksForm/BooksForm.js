import React, { useState } from 'react';
import './BooksForm.scss'
import { api } from '../../../services/requesterService.js';
import { useBook } from '../../../context/BookCtx';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

const BooksForm = () => {
    const { addNewBook } = useBook();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [chapters, setChapters] = useState('');
    const [description, setDescription] = useState('');

    const [errTitle, setErrTitle] = useState(null);
    const [errImage, setErrImage] = useState(null);
    const [errChapters, setErrChapters] = useState(null);
    const [errDescription, setErrDescription] = useState(null);

    const isInvalid = () => {
        setErrTitle(null);
        setErrImage(null);
        setErrDescription(null);
        setErrChapters(null);

        let result = false;
        if (title === '' || title.length < 5) {
            setErrTitle('Invalid title!');
            result = true;
        }
        if (image === '' || !image.startsWith('http') || !image.startsWith('https')) {
            setErrImage('Image must start with "http" or "https"');
            result = true;
        }
        if (description === '' || description.length < 10) {
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
            <Input
                type="Title"
                placeholder="Enter your book name"
                value={title}
                err={errTitle}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                type="Image"
                placeholder="Enter image URL address"
                value={image}
                err={errImage}
                onChange={(e) => setImage(e.target.value)}
            />
            <Textarea
                type="Description"
                placeholder="Book description"
                value={description}
                err={errDescription}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Textarea
                type="Book Chapters"
                placeholder="Add book chapters each on a new line"
                value={chapters}
                err={errChapters}
                onChange={(e) => setChapters(e.target.value)}
            />
            <button className='button' type='submit'>Submit</button>
        </form>
    );
};

export default BooksForm;