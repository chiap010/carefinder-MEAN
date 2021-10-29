const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const server = express();

var corsOptions = {
      origin: "http://localhost",
};

server.use(cors(corsOptions));

// parse requests of content-type - application/json
// server.use(bodyParser.json()); - call  not used because it's deprecated.
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

// Import our routes
const v1URI = "/api/v1/hospitals";

// Hospital routes
const hospitalRoutes = require("./src/routes/hospitalRoutes");
server.use(v1URI, hospitalRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 5556;
server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
});

const mongoose = require("mongoose");
const { application } = require("express");

// Get MongoDB connection string
require("dotenv").config();
var uri = process.env.MONGO_CONN;

// Connect to MongoDB
mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
      console.log("MongoDB database connection established successfully.");
});
