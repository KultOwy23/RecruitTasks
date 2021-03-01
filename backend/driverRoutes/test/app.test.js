const assert = require('assert');
const app = require('../app');
const chai = require('chai');
const chai_http = require('chai-http');
const { createSecretKey } = require('crypto');

chai.use(chai_http);
chai.should();

describe('General app tests', () => {
    it('should return 404 for undefined route', (done) => {
        chai.request(app)
            .get('/unknown')
            .end((_, res) => {
                res.should.have.status(404);
                done();
            });
    });
});


describe('Adding routes to history', () => {
    describe('Input validation', () => {
        it("should return error for no input", (done) => {
            chai.request(app)
                .put('/journeys')
                .end((_, res) => {
                    res.should.have.status(500);
                    assert.strictEqual('Invalid input parameters',res.body.error);
                    done();
                });
        });

        it("should return error for invalid input", (done) => {
            chai.request(app)
                .put('/journeys')
                .set('content-type','application/json')
                .set({
                    date: "2012-04-23T18:25:43.511Z",
                    startAddress: "Nice",
                    stopAddress: "Here is stop",
                    price: '1231.111'
                })
                .end((_, res) => {
                    res.should.have.status(500);
                    assert.strictEqual('Invalid input parameters',res.body.error);
                    done();
                });
        });
    })
});

describe('Get daily report', () => {
    describe('Input validation', () => {
        it("should return error for no input", (done) => {
            chai.request(app)
                .get('/reports/daily')
                .end((_, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });
});

describe('Get report for date range', () => {
    describe('Input validation', () => {
        it("should return error for no input", (done) => {
            chai.request(app)
                .get('/reports/daterange')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});