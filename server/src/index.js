const  express = require('express');

const databaseConfig = require('./config/database.js');
const serverConfig = require('./config/server.js');
const serverRouter = require('./router.js');

const app = express();

databaseConfig();
serverConfig(app);
serverRouter(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(5000, () =>
  console.log('[server] App listening on port 5000!'),
);