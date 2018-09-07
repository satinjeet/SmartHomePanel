const express = require('express');                   // express application framework
const bodyParser = require('body-parser');              // Parses incoming data in request body.
const bundler = require("./src/core/bundler");       // Compiles client side JS and CSS
const Config = require('./src/core/config');
const config = new Config();
const app = config.withExpress(express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + "/dist"));
// app.set("views", __dirname + "/views");

// Serve the application at the given port
app.listen(config.port, "0.0.0.0", () => {
    // Success callback
    bundler(config);
    console.log(`Listening at http://${config.domain}:${config.port}/`);
});

module.exports = app;