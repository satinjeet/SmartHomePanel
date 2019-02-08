const express = require('express');                   // express application framework
const bodyParser = require('body-parser');            // Parses incoming data in request body.
const bundler = require("./src/core/bundler");        // Compiles client side JS and CSS
const Config = require('./src/core/config');
const Pages = require('./src/controllers/page');
const HueAPI = require('./src/controllers/hueapi');
const app = Config.Instance.withExpress(express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + "/dist"));
// app.set("views", __dirname + "/views");

app.use("/", Pages);
app.use("/api", HueAPI);

// Serve the application at the given port
app.listen(Config.Instance.port, "0.0.0.0", () => {
    // Success callback
    bundler(Config.Instance);
    console.log(`Listening at http://${Config.Instance.domain}:${Config.Instance.port}/`);
});

module.exports = app;