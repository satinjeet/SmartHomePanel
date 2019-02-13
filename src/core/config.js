const fs = require('fs');
const path = require('path');
const priority = ['', 'dev', 'prod'];
const env = process.env.HUE_ENV || 'dev';

console.log('Environment => ', env);

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

let instance = undefined;

class Config {
    constructor() {
        if (instance) {
            throw new Error("config object already exists. use Config.Instance to use the instance");
            return;
        }
        
        this._configName = "DEFAULT";
        const configDir = path.resolve(__dirname, "../config");
        
        // fs.readdirSync(configDir).map(file => {
        //     const [fullMatch, environment] = (/\.config.?([a-z]*?)\.json/gi.exec(file)) || [];
        //     return environment;
        // }).sort((configFile1, configFile2) => {
        //     const cf1I = priority.indexOf(configFile1);
        //     const cf2I = priority.indexOf(configFile2);
        //     return cf1I < cf2I ? -1 : 1;
        // }).map(configFile => {
        const fileContent = fs.readFileSync(path.resolve(configDir, `.config${env ? ('.' + env) : ''}.json`)).toString();
        Object.assign(this, confParser(fileContent));
        this._configName = env.toUpperCase();
        // });
    }

    withExpress(application/* : Express.App */)/* : Express.App */ {
        application.set('view engine', this.viewEngine);
        application.set("views", this.viewDirectory);

        return application;
    }

    static get Instance() {
        if (!instance) {
            instance = new Config;
        };
        
        return instance;
    }
}

module.exports = Config;