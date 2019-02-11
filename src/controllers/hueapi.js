const brigeIpFinder = "https://www.meethue.com/api/nupnp";
const HueAPI = require('express').Router()
const Response = require('../core/Responses/Response');
const request = require("request");
const fs = require("fs");
const path = require("path");
const Config = require("../core/config");
const moment = require("moment");

// TODO with DB

class BridgeIpRecord {
    constructor(ip) {
        this.ip = ip;
        this.on = moment().format();
    }
}


const buffer = 2 * 60 * 60 * 1000;
const fileNames = {
    bridgeIp: path.resolve(Config.Instance.cache, 'ipaddress.file')
}
let currentIp = null;

HueAPI.get("/bridge", (req, res) => {

    let contentOfTheFile;
    if (!fs.existsSync(fileNames.bridgeIp)) {
        contentOfTheFile = [];
    } else {
        contentOfTheFile = JSON.parse(fs.readFileSync(fileNames.bridgeIp).toString());
        const lastRecord = contentOfTheFile[contentOfTheFile.length - 1];

        // console.log(Math.abs(moment(lastRecord.on).diff(moment())), "DIFF");
        if (Math.abs(moment(lastRecord.on).diff(moment())) <= buffer) {
            currentIp = lastRecord.ip;
            res.send(new Response({ ip: lastRecord.ip, fullList: contentOfTheFile }, false))
            return;
        }
    }

    
    request(brigeIpFinder, { json: true }, (err, response, body) => {
        // console.log(response);
        if (err) { res.status(400).send(new Response('Oops')); }
        
        const ip = currentIp = body[0].internalipaddress;
        contentOfTheFile.push(new BridgeIpRecord(ip));
        fs.writeFileSync(fileNames.bridgeIp, JSON.stringify(contentOfTheFile), { encoding: 'utf8', flag: 'w' });
        res.send(new Response({ ip: ip, fullList: contentOfTheFile }, false));
    });
});

HueAPI.get("/devices", (req, res) => {
    if (!currentIp) {
        res.status(400).send('No Brige Jose!!');
        return;
    }

    console.log("Bridge call: ", `https://${currentIp}/api/${Config.Instance.hueUser}/lights`);
    request(`https://${currentIp}/api/${Config.Instance.hueUser}/lights`, { json: true, strictSSL: false }, (err, response, body) => {
        if (err) {
            res.status(400).send(new Response(err));
        }

        res.send(body);
    })
});

HueAPI.post("/devices/:deviceId", (req, res) => {
    if (!currentIp) {
        res.status(400).send("No Brige Jose!!");
        return;
    }

    const url = `https://${currentIp}/api/${Config.Instance.hueUser}/lights/${req.params.deviceId}/state`

    console.log("Bridge call: ", url, { on: req.body.lampOn, bri: Math.floor(req.body.bri) });
    request(
        url,
        { json: true, strictSSL: false, method: "PUT" , body: { on: req.body.lampOn, bri: Math.floor(req.body.bri) }},
        (err, response, body) => {
            if (err) {
                res.status(400).send(new Response(err));
            }

            // Ask all devices to refresh their values.
            require('./sockets/socketapi').Instance.connection.emit("event.devices.list");
            res.send(body);
        }
    );
});

module.exports = HueAPI;