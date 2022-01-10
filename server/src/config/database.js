const mongoose = require('mongoose');

async function databaseConfig() {

    const databaseUrl = 'mongodb+srv://boyko:mPkF7Q29Fqqug4c1@softuni.dx3ut.mongodb.net/books-and-movies';
    const databaseStatus = (err) => {
        err
            ? console.error(err)
            : console.log('[database] Database is setup and running');
    }

    return await mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, databaseStatus);
}

module.exports = databaseConfig;