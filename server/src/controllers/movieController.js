const express = require('express');
const movieService = require('../services/movieService.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await movieService.findAll();
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(400).json('Bad Request');
    }
})

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        if (!data || !data.title)
            res.status(400).json('Bad Request');

        data.episodes = data.episodes.map(string => ({
            name: string,
            isWatched: false
        }))
        const savedMovie = await movieService.create(data);
        res.status(200).json(savedMovie);
    }
    catch (err) {
        console.error(err);
        res.status(400).json('Bad Request');
    }
})

router.put('/', async (req, res, next) => {
    try {
        const data = req.body;
        if (!data || !data._id)
            res.status(400).json('Bad Request');

        const savedMovie = await movieService.update(data);
        res.status(200).json(savedMovie);
    }
    catch (err) {
        console.error(err);
        res.status(400).json('Bad Request');
    }
})

module.exports = router;