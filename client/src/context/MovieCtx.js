import React, { useCallback, useContext, useState } from 'react';

const MovieCtx = React.createContext();

export const useMovie = () => {
    return useContext(MovieCtx);
};

export const MovieProvider = ({ children }) => {

    const [movies, setMovies] = useState([]);

    const getMoviesData = () => movies;

    const getMovieById = (id) => {
       return  movies.find(movie => movie._id === id);
    }

    const setMoviesData = useCallback((data) => setMovies(data), []);

    const addNewMovie = useCallback((data) => {
        setMovies(oldState => ([...oldState, data]));
    }, []);

    const getFavoritesMovies = () => {
        return movies.filter(movie => movie.favorites);
    }

    const getUnwatchedMovies = () => {
        const isAllEpisodesUnwatched = (movie) => {
            const hasWatchedEpisodes = movie.episodes.find(episode => episode.isWatched === true);
            return hasWatchedEpisodes ? false : true;
        }
        return movies.filter(movie => isAllEpisodesUnwatched(movie));
    }

    const getWatchedMovies = () => {
        const isAllEpisodesWatched = (movie) => {
            const hasUnwatchedEpisodes = movie.episodes.find(episode => episode.isWatched === false);
            return hasUnwatchedEpisodes ? false : true;
        }
        return movies.filter(movie => isAllEpisodesWatched(movie));
    }

    const getCurrentlyWatchingMovies = () => {
        const hasWatchedAndUnwatchedEpisodes = (movie) => {
            let hasWatchedEpisodes = false;
            let hasUnwatchedEpisodes = false;
            movie.episodes.map(episode => {
                if (episode.isWatched) hasWatchedEpisodes = true;
                if (!episode.isWatched) hasUnwatchedEpisodes = true;
                return episode;
            })
            return hasWatchedEpisodes && hasUnwatchedEpisodes;
        }
        return movies.filter(movie => hasWatchedAndUnwatchedEpisodes(movie));
    }

    const value = {
        setMoviesData,
        getMoviesData,
        getMovieById,
        addNewMovie,
        getWatchedMovies,
        getUnwatchedMovies,
        getFavoritesMovies,
        getCurrentlyWatchingMovies,
    };

    return (
        <MovieCtx.Provider value={value}>
            {children}
        </MovieCtx.Provider>
    );
};