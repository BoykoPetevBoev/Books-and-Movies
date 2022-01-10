const express = require('express');
const cors = require('cors');

function expressConfig(app) {

    app.use(cors());
    app.use(express.json());
    app.use(express.static('static'));
    app.use(express.urlencoded({ extended: true }))

    return app;
}

module.exports = expressConfig