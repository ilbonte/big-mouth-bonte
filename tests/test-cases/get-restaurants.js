
const expect = require('chai').expect;
const init = require('../steps/init').init;
const when = require('../steps/when');


describe('When we invoke the GET /restaurants endpoint', async function () {
    before(async function () {
        await init()
    })

    it("should return the index page with 8 restaurants", async function () {
        let res = await when.we_invoke_get_restaurants();

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.lengthOf(8);

        for (let restaurant of res.body) {
            expect(restaurant).to.have.property('name');
            expect(restaurant).to.have.property('image');
        }
    })
})