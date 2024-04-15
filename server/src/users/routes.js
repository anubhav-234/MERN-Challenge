// routes/api.js

const express = require('express');
const router = express.Router();
const apiController = require('./controller.js');

router.get('/list', apiController.getUsers);
router.post('/create', apiController.createUser);
router.patch('/update', apiController.updateUser)
router.delete('/delete', apiController.deleteUser)

module.exports = router;
