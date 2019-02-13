const fs = require('fs');
const path = require('path');
const bundler = require("./src/core/bundler");        // Compiles client side JS and CSS
const Config = require('./src/core/config');

const date = new Date;
const cacheDir = path.resolve(__dirname, 'cache');
const cacheDirBackup = path.resolve(__dirname, `cache-${
    date.getFullYear()
}-${
    date.getMonth()
}-${
    date.getDay()
} ${
    date.getHours()
}__${
    date.getMinutes()
}__${
    date.getSeconds()
}`);
const cacheDirExists = fs.existsSync(cacheDir);
const cacheDirExistsBackup = fs.existsSync(cacheDirBackup);
if (cacheDirExists) {
    fs.renameSync(cacheDir, cacheDirBackup);
}

console.log(cacheDir);

fs.mkdirSync(cacheDir);
bundler(Config.Instance);