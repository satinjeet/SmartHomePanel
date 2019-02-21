const Config = require('../../core/config');
const path = require('path');
const fs = require('fs');
const CalenderAPI = require('express').Router();
const JsonReader = require('../../core/filereader').JsonReader;
const { google } = require("googleapis");


// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.resolve(Config.Instance.cache, "token.json");
const CRENDENTIALS_PATH = path.resolve(Config.Instance.cache, "credentials.json");

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function createOAuthClient(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter the code from that page here: ", code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err) console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

CalenderAPI.get('/authorize', (req, res) => {
    const fr = new JsonReader(CRENDENTIALS_PATH);
    const tr = new JsonReader(TOKEN_PATH);

    fr.readState
        .then(credentials => {
            const oAuth2Client = createOAuthClient(credentials);
            return tr.readState.then(token => oAuth2Client.setCredentials(token))
        })
        .then(() => {
            res.send("Hello")
        })
        .catch(err => {
            res.status(400).send(err.toString());
        });
});

module.exports = CalenderAPI


