// routes/api.js

const express = require('express');
const router = express.Router();
const apiController = require('./controller.js');

router.get('/data', apiController.getData);
router.post('/data', apiController.postData);

module.exports = router;
