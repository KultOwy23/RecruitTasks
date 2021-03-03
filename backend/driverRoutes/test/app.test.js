const assert = require('assert');
const app = require('../app');
const chai = require('chai');
const chai_http = require('chai-http');

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
                .send({
                    date: "ABCD",
                    startAddress: "Nice",
                    stopAddress: "Here is stop",
                    price: '1231.11'
                })
                .end((_, res) => {
                    res.should.have.status(500);
                    assert.strictEqual('Invalid input parameters',res.body.error);
                    done();
                });
        });

        it("should not return any error for right input", (done) => {
            chai.request(app)
                .put('/journeys')
                .set('content-type','application/json')
                .send({
                    date: "2021/03/03",
                    startAddress: "Nice",
                    stopAddress: "Here is stop",
                    price: 123.45
                })
                .end((_, res) => {
                    res.should.not.have.status(500);
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

        it("should return error for invalid input", (done) => {
            chai.request(app)
                .get('/reports/daily')
                .set('content-type','application/json')
                .send({
                    date: "ABCD",
                })
                .end((_, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("should not return error for valid date", (done) => {
            chai.request(app)
                .get('/reports/daily')
                .set('content-type','application/json')
                .send({
                    date: "2004/05/21",
                })
                .end((_, res) => {
                    res.should.have.status(200);
                    done();
                });
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

        it("should return error for invalid input", (done) => {
            chai.request(app)
                .get('/reports/daterange')
                .set('content-type','application/json')
                .send({
                    startDate: "2004/05/21",
                    endDate: "ABCD"
                })
                .end((_, res) => {
                    res.should.have.status(500);
                });
            
            chai.request(app)
                .get('/reports/daterange')
                .set('content-type','application/json')
                .send({
                    startDate: "ABCD",
                    endDate: "2005/05/21"
                })
                .end((_, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});