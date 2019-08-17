const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb+srv://omnistack:VMMrAyoydl8qWHjG@cluster0-xcyoq.mongodb.net/omnistack8?retryWrites=true&w=majority", {
    useNewUrlParser: true
});
const server = express();
const port = 3333;
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port);

