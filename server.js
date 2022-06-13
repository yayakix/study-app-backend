const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors");
const morgan = require('morgan')
const app = express();

// configure app setting
require('dotenv').config();
const {PORT = 4000, MONGODB_URL} =process.env;
// connect to mongodb
mongoose.connect(MONGODB_URL)
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

const peopleSchema= new mongoose.Schema({
    name: String,
    image: String,
    title: String
}, {timestamps: true});

const People =  mongoose.model('People', peopleSchema);

// mount middleware
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.send("herro world")
})

app.get("/people", async (req, res) => {
    try {
        res.json(await People.find({}));
        res.send("some peeps");
        
    } catch (error) {
        console.log("error is: " + error)
    }
    
});

// create
app.post('/people', async (req,res) => {
    try {
        res.json(await People.create(req.body));
    } catch (error) {
        console.log(error)
    }
})

// PEOPLE DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE UPDATE ROUTE
app.put("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})