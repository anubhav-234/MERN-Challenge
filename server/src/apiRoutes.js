// routes/apiRoutes.js

const express = require('express');
const test1Router = require('./users/routes.js');

const combinedRouter = express.Router();

combinedRouter.use('/users', test1Router);

module.exports = combinedRouter;
