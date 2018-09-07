const fs = require('fs');
const path = require('path');

const priority = ['', 'dev', 'prod'];


function confParser(configString) {
    [{
        path: path.resolve(__dirname, "../"),
        var: /\{srcDir\}/g
    },{
        path: path.resolve(__dirname, "../../"),
        var: /\{rootDir\}/g
    }].forEach(variables => {
        configString = configString.replace(variables.var, variables.path);
    });
    return JSON.parse(configString);
}

class Config {
    constructor() {
        this._configName = "DEFAULT";

        const configDir = path.resolve(__dirname, "../config");
        const files = fs.readdirSync(configDir).map(file => {
            const execResult = /\.config.?([a-z]*?)\.json/gi.exec(file);
            return [execResult[0], execResult[1]];
        }).sort((configFile1, configFile2) => {
            const cf1I = priority.indexOf(configFile1[1]);
            const cf2I = priority.indexOf(configFile2[1]);
            return cf1I < cf2I ? -1 : 1;
        }).map(configFile => {
            const fileContent = fs.readFileSync(path.resolve(configDir, configFile[0])).toString();
            Object.assign(this, confParser(fileContent));
            this._configName = configFile[1].toUpperCase();
        });
    }

    withExpress(application/* : Express.App */)/* : Express.App */ {
        application.set('view engine', this.viewEngine);
        application.set("views", this.viewDirectory);

        return application;
    }
}
module.exports = Config;