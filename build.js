const bundler = require("./src/core/bundler");        // Compiles client side JS and CSS
const Config = require('./src/core/config');

bundler(Config.Instance);