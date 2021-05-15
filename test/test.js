const expect = require('chai').expect;
const { calculatingAspectRatio } = require('./functions.js');


describe("function calculatingAspectRatio()", function () {
    it("should be true if 210", function () {
        expect(calculatingAspectRatio(1680, 1050)).to.be.eq(210);
    })

    it("should be true if 16", function () {
        expect(calculatingAspectRatio(1136, 640)).to.be.eq(16);
    })

    it("should be true if 30", function () {
        expect(calculatingAspectRatio(1200, 630)).to.be.eq(30);
    })

    it("should be true if 256", function () {
        expect(calculatingAspectRatio(1024, 768)).to.be.eq(256);
    })

    it("should be true if 4", function () {
        expect(calculatingAspectRatio(1920, 1084)).to.be.eq(4);
    })

    it("should be true if 2", function () {
        expect(calculatingAspectRatio(1366, 768)).to.be.eq(2);
    })

})
