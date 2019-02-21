const fs = require('fs');
const Pages = require('express').Router()

const { getScriptsFromIndex } = require('../core/dist_reader');

Pages.get("/", (req, res) => {
    const {scripts, stylesheets} = getScriptsFromIndex();    
    res.render('home', { scripts, stylesheets, devMode: process.env.HUE_ENV !== 'prod'});
});

Pages.get("/_/:anypageforfrontend", (req, res) => {
    const { scripts, stylesheets } = getScriptsFromIndex();
    res.render('home', { scripts, stylesheets, devMode: process.env.HUE_ENV !== 'prod'});
});

module.exports = Pages;