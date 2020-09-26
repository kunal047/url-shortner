const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = "http://0.0.0.0:3000/api/v1";

describe("CREATE /shorten", () => {
    it("should get the url from shortcode", (done) => {
        chai.request(baseUrl)
            .post('/shorten')
            .set('content-type', 'application/json')
            .send({ url: 'www.fb.com' })
            .end(function(err, res, body) {
                
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    });
})

describe("FOR /:shortcode", () => {
    it("should get the url from shortcode", (done) => {
        const shortcode = "ONByjgUrM2AOMsxAjKeLoWOUloTl0";
        chai.request(baseUrl)
            .get(`/${shortcode}`)
            .redirects(0)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(302);
                done();
            });
    });

    it("should get the stats from shortcode", (done) => {
        const shortcode = "ONByjgUrM2AOMsxAjKeLoWOUloTl0";
        chai.request(baseUrl)
            .get(`/${shortcode}/stats`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
