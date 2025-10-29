// database connectivity code

const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

// conn ected to mongodb compass local host string
mongoose.connect(mongoURI).then(() => {
    console.log("connected to mongo sucessfully")
}).catch((err) => {
    console.log("error")
});


// #connected to express
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// availabel routes

// middle ware used to connect with the postman with the links of notes and auth
app.use(express.json())

app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})



