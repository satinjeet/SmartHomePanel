const PouchDB = require('pouchdb');
const Config = require('./config');

var db = new PouchDB(`http://${Config.Instance.domain}:5984/devices`);

console.log('DB setup')

module.exports = db;