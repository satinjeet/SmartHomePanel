const assert = require("assert");
const Config = require("../../src/core/config");

describe("Config Reader Test", () => {
    it("Config should revieve the default values", () => {
        const config = new Config();
        console.log(config);
        assert.ok(config);
    });
});