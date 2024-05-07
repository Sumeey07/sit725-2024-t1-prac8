var express = require("express")
var { MongoClient } = require("mongodb");
var clickController = require("./public/js/controllers/clickController");
var formController = require("./public/js/controllers/formController");
var cardController = require("./public/js/controllers/cardController");
var path = require("path");
var http = require("http");

var server = express()
var httpServer = http.createServer(server);

server.use(express.static(__dirname + '/public'))
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

var io = require('socket.io')(httpServer);

var uri = "mongodb://localhost:27017";
var client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db("AppliedSoftwareEngineering");
    const collection = db.collection("Task7.2P");

    // Insert test data for MongoDB
    collection.insertOne({
      first_name: "Sumeet",
      last_name: "Kumar",
      password: "test12345",
      email: "test@example.com"
    });

    server.post('/api/projects/insert', formController.submitForm.bind(null, collection));
    server.get('/api/projects', cardController.getProjects.bind(null, collection));

    server.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "view.html"));
    });

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.emit('welcome', 'Welcome to the chat!');

      socket.on('chat message', (msg) => {
        console.log('Message from client:', msg);

        io.emit('chat message', msg);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    // Start the server after MongoDB connection
    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
      console.log("server listening to port: " + port);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = server; // Export the server object for testing

    // --reporter spec test/apiTests.test.js
