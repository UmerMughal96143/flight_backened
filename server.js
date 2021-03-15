const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db');
const formRoute = require('./routes/form')







const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json({extended : false}))
dotenv.config({path : 'config/config.env'})





connectDB();
const PORT = process.env.PORT || 3008 ;





app.use('/flight/api/v1',formRoute)







// console.log(Math.floor(100000 + Math.random() * 900000));



app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});