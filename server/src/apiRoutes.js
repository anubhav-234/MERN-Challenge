// routes/apiRoutes.js

const express = require('express');
const test1Router = require('./users/routes.js');
const test2Router = require('./test2/routes.js');

const combinedRouter = express.Router();

combinedRouter.use('/users', test1Router);
combinedRouter.use('/test2', test2Router);

module.exports = combinedRouter;
