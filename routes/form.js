const express = require('express');
const router = express.Router();
const {flightForm,getAllForms} = require('../controllers/form')





router.post('/form', flightForm);
router.get('/form', getAllForms);


module.exports = router;