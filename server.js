const express = require('express');
const mongoose = require('mongoose')
const app = express();

// configure app setting
require('dotenv').config();
const {PORT = 4000, MONGODB_URL} =process.env;
// connect to mongodb
mongoose.connect(MONGODB_URL)
mongoose.connection.on()

app.get('/', (req,res) => {
    res.send("herro world")
})

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})