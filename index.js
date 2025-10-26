// database connectivity code

const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

// conn ected to mongodb compass local host string
mongoose.connect(mongoURI).then(() => {
    console.log("connected to mongo sucessfully")
}).catch((err) => {
    console.log("error")
});


// #connected to express
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



