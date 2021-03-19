const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db');
const formRoute = require('./routes/form')
const authRoute = require('./routes/auth')







const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json({extended : false}))
dotenv.config({path : 'config/config.env'})





connectDB();
const PORT = process.env.PORT || 3008 ;





app.use('/flight/api/v1',formRoute)
app.use('/flight/api/v1/auth',authRoute)





app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});