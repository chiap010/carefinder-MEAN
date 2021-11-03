const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const bodyParser = require("body-parser");

const server = express();

var corsOptions = {
      //origin: "http://localhost:3000",
      origin: "*",
      // allowedHeaders: ["X-API-KEY", "Content-Type"], // you can change the headers
      // exposedHeaders: ["X-API-KEY", "Content-Type"], // you can change the headers
};

server.use(cors(corsOptions));

/*
server.all("/", function (req, res, next) {
      res.header("Access-Control-Allow-Headers", "X-API-KEY");
      next();
});
*/

// parse requests of content-type - application/json
// server.use(bodyParser.json()); - call  not used because it's deprecated.
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

// Import our routes

// Hospital routes
const hospitalRoutes = require("./src/routes/hospitalRoutes");
server.use("/hospitals", hospitalRoutes);

// API key routes
const userRoutes = require("./src/routes/userRoutes");
server.use("/users", userRoutes);

// Helmet helps secure Express apps, securing HTTP headers
server.use(helmet());

// set port, listen for requests
const PORT = process.env.PORT || 5556;
server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
});

const mongoose = require("mongoose");
//const { application } = require("express");

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
