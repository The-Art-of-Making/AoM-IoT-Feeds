const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const feeds = require("./routes/feeds")
const db = process.env.MONGOURI

const server = express()

mongoose
    .connect(
        db,
        // { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err))

server.use(
    bodyParser.urlencoded({
        extended: false
    })
)

server.use(bodyParser.json())

server.use("/feeds/", feeds)

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server up and running on port ${port}!`))