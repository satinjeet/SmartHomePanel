class Response {
    constructor(body, failed) {
        this.body = body;
        this.failed = !!failed;
    }
}

module.exports = Response;