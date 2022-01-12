import React, { useState } from 'react';
import './MovieForm.scss';
import { api } from '../../../services/requesterService.js';
import { useMovie } from '../../../context/MovieCtx';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

const MovieForm = () => {

    const { addNewMovie } = useMovie();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [episodes, setEpisodes] = useState('');

    const [errTitle, setErrTitle] = useState(null);
    const [errImage, setErrImage] = useState(null);
    const [errDescription, setErrDescription] = useState(null);
    const [errEpisodes, setErrEpisodes] = useState(null);

    const isInvalid = () => {
        setErrTitle(null);
        setErrImage(null);
        setErrDescription(null);
        setErrEpisodes(null);

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
        if (episodes === '') {
            setErrEpisodes('Invalid movie episodes!');
            result = true;
        }
        return result;
    };

    const handleResponse = (data) => {
        setTitle('');
        setDescription('');
        setImage('');
        setEpisodes('');
        addNewMovie(data);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (isInvalid()) return;

        const movieData = {
            title,
            image,
            description,
            episodes: episodes.split('\n')
        }

        api.post('movies', movieData)
            .then(data => handleResponse(data))
            .catch(err => console.error(err))
    }

    return (
        <form className='movies-form' onSubmit={onSubmit}>
            <Input
                type="Title"
                placeholder="Enter your movie name"
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
                placeholder="Movie description"
                value={description}
                err={errDescription}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Textarea
                type="Movie Episodes"
                placeholder="Add movie episodes each on a new line"
                value={episodes}
                err={errEpisodes}
                onChange={(e) => setEpisodes(e.target.value)}
            />
            <button className='button' type='submit'>Submit</button>
        </form>
    );
};

export default MovieForm;