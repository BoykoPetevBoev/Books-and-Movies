const express = require('express');
const bookService = require('../services/bookService.js')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await bookService.findAll();
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

        data.chapters = data.chapters.map(string => ({
            name: string,
            isReaded: false
        }))
        const savedBook = await bookService.create(data);
        res.status(200).json(savedBook);
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

        const savedBook = await bookService.update(data);
        res.status(200).json(savedBook);
    }
    catch (err) {
        console.error(err);
        res.status(400).json('Bad Request');
    }
})

module.exports = router;