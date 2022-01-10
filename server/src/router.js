const bookController = require('./controllers/bookController.js');
const movieController = require('./controllers/movieController.js');

function expressRouter(server) {
    
    server.use('/books', bookController);
    server.use('/movies', movieController);
}

module.exports = expressRouter;