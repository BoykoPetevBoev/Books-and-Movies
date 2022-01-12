const  express = require('express');

const databaseConfig = require('./config/database.js');
const serverConfig = require('./config/server.js');
const serverRouter = require('./router.js');

const PORT = 5000;

const app = express();

databaseConfig();
serverConfig(app);
serverRouter(app);

app.listen(PORT, () =>
  console.log(`[server] App listening on port ${PORT}!`),
);