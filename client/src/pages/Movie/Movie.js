import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { api } from '../../services/requesterService.js'
import { useMovie } from '../../context/MovieCtx';
import './Movie.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AddRating from '../../components/common/AddRating/AddRating.js';
import AddToFavorites from '../../components/common/AddToFavorites/AddToFavorites.js';
import UnorderedList from '../../components/common/UnorderedList/UnorderedList.js';

const Movie = () => {

    const params = useParams();
    const { getMovieById } = useMovie();

    const [movie, setMovie] = useState(null);
    const [hasChanges, setHasChanged] = useState(false);

    useEffect(() => {
        console.log('Movie');
        setMovie(getMovieById(params.id));
    }, [getMovieById, params])

    const handleRating = (e) => {
        setHasChanged(true);
        setMovie(oldState => ({ ...oldState, rating: e.target.value }))
    }

    const handleAddToFavorites = () => {
        setHasChanged(true);
        setMovie(oldState => ({ ...oldState, favorites: !oldState.favorites }))
    }

    const handleIsWatched = (id) => {
        const changeEpisode = (episode) => {
            return episode._id === id
                ? { ...episode, isWatched: !episode.isWatched }
                : episode
        }
        setHasChanged(true);
        setMovie(oldState => ({
            ...oldState,
            episodes: oldState.episodes.map(episode => changeEpisode(episode))
        }))
    }

    const handleSaveChanges = () => {
        setHasChanged(false)
        api.put('movies', movie)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    if (!movie) return <Header />

    return (
        <div className='movie-page-component'>
            <Header />

            <div className='section'>
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>

                <div className='flex'>
                    <div className='column'>
                        <h3>Episodes</h3>
                        <UnorderedList
                            array={movie.episodes}
                            onClick={handleIsWatched}
                        />
                        <div className='flex'>
                            <AddRating
                                rating={movie.rating}
                                onChange={handleRating}
                            />
                            <AddToFavorites
                                isInFavorites={movie.favorites}
                                onClick={handleAddToFavorites}
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <img src={movie.image} alt='movie' />
                    </div>
                </div>

                {hasChanges
                    ? <button className='button' onClick={handleSaveChanges}>Save</button>
                    : null
                }
            </div>

            <Footer />
        </div>
    );
};

export default Movie;