// routes/api.js

const express = require('express');
const router = express.Router();
const apiController = require('./controller.js');

router.get('/allBooks', apiController.getAllBooks)
router.post('/checkout', apiController.performBookCheckout);
router.post('/return', apiController.performBookReturn);
router.post('/memberDate', apiController.getMembersData);

module.exports = router;
