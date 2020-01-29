const expect = require("chai").expect
const when = require("../steps/when")
const init = require("../steps/init").init
const cheerio = require('cheerio');



describe('when we invoke the GET / endpoint', async function () {
    before(async function () {
        await init()
    })

    it("should return the index page with 8 restaurants", async function () {
        let res = await when.we_invoke_get_index()

        expect(res.statusCode).to.equal(200)
        expect(res.headers['content-type']).to.equal('text/html; charset=UTF-8')
        expect(res.body).to.not.be.null

        const $ = cheerio.load(res.body);
        let restaurants = $('.restaurant', '#restaurantsUl');
        expect(restaurants.length).to.equal(8);
    })
})