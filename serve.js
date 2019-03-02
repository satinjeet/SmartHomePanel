const express = require('express');                   // express application framework
const bodyParser = require('body-parser');            // Parses incoming data in request body.
const bundler = require("./src/core/bundler");        // Compiles client side JS and CSS
const Config = require('./src/core/config');
const Pages = require('./src/controllers/page');
const HueAPI = require('./src/controllers/hueapi');
const SocketApi = require('./src/controllers/sockets/socketapi');
const CalenderAPI = require('./src/controllers/google/calendar');
// const DB = require('./src/core/database');

const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

new SocketApi(io);
// app.set("views", __dirname + "/views");

// Always set body parser before anything
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Config.Instance.withExpress(app);

app.use("/", Pages);
app.use("/api", HueAPI);
app.use("/api", CalenderAPI);
app.use("/public", express.static(Config.Instance.outDir));

// Serve the application at the given port
http.listen(Config.Instance.port, Config.Instance.domain, () => {
    // Success callback
    if (process.env.HUE_ENV !== 'prod') {
        bundler(Config.Instance);
    }
    console.log(`Listening at http://${Config.Instance.domain}:${Config.Instance.port}/`);
});

module.exports = app;