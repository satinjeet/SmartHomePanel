const Config = require("./config");
const fs = require("fs");

module.exports = {
    getScriptsFromIndex(path) {
        const fileName = process.env.HUE_ENV === 'prod' ? 'index.prod.html': 'index.html';
        const publicContent = fs.readFileSync(Config.Instance.outDir + "/" + fileName).toString();
        const scriptRegex = new RegExp("\<script src=\"public\/(.*?.js){1}.*?\>$", "gmi");
        const cssRegexp = new RegExp("<link.*?href=\"public\/(.*?.css){1}.+?>$", "gmi");

        const scripts = [], stylesheets = [];
        let scriptName, sheetName;
        while (scriptName = scriptRegex.exec(publicContent)) {
            scripts.push(scriptName[1]);
            scriptRegex.lastIndex += 1;
        }

        while (sheetName = cssRegexp.exec(publicContent)) {
            stylesheets.push(sheetName[1]);
            cssRegexp.lastIndex += sheetName[0].length;
        }

        return {scripts, stylesheets};
    }
}