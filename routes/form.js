const express = require('express');
const router = express.Router();
const {flightForm} = require('../controllers/form')





router.post('/form', flightForm);


module.exports = router;