import React, { useEffect } from 'react';
import { api } from '../../services/requesterService.js'
import { useMovie } from '../../context/MovieCtx';
import './Movies.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import CatalogList from '../../components/CatalogList/CatalogList.js';
import MovieForm from '../../components/forms/MovieForm/MovieForm.js';

const Movies = () => {

    const {
        setMoviesData,
        getWatchedMovies,
        getUnwatchedMovies,
        getFavoritesMovies,
        getCurrentlyWatchingMovies,
    } = useMovie();

    useEffect(() => {
        api.get('movies')
            .then(data => setMoviesData(data))
            .catch(err => console.error(err))
    }, [setMoviesData])

    return (
        <div className='movies-page-component'>
            <Header />

            <div className='background'>
                <h2>Movies Catalog</h2>
                <CatalogList
                    data={getUnwatchedMovies()}
                    title="Recommended"
                    description="Looking for a new and interesting movie to watch?"
                    type="movies"
                />
            </div>

            <div className='background'>
                <CatalogList
                    data={getFavoritesMovies()}
                    title="Favorites"
                    description="This list shows all the movies you have added to favorites. If you want to change it please go to the movie you want and check the 'favorites' box."
                    type="movies"
                />
            </div>

            <div className='background'>
                <CatalogList
                    data={getCurrentlyWatchingMovies()}
                    title="You are currently watching"
                    description="This list contains the movies you are currently watching."
                    type="movies"
                />
            </div>

            <div className='background'>
                <CatalogList
                    data={getWatchedMovies()}
                    title="Watched movies"
                    description="All the movies you have already watched can be viewed in this section."
                    type="movies"
                />
            </div>

            <div className='background'>
                <div className='section'>
                    <h3>Movie Form</h3>
                    <p>Please feel free to add your favourite movie if you do not see it in the catalog.</p>
                    <MovieForm/>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Movies;