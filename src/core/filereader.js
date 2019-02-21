const fs = require('fs');

class FileReader {
    constructor(filePath) {
        this._content = undefined;
        this._error = undefined;

        this.readState = new Promise((res, rej) => {
            fs.readFile(filePath, (err, content) => {
                if (err) { 
                    this._error = err;
                    rej(err);
                }

                try {
                    res(this.parseContent(content));
                } catch (e) {
                    rej(e);
                }
            });
        });
    }

    parseContent(content) {
        return this.content = content;
    }
}

class JsonReader extends FileReader {
    parseContent(content) {
        return this.content = JSON.parse(content);
    }
}

module.exports = {
    FileReader,
    JsonReader
};