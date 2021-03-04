const assert = require('assert');
const app = require('../app');
const chai = require('chai');
const chai_http = require('chai-http');
const dbConn = require('../src/dbConnection');
const { check } = require('express-validator');
const { expect } = require('chai');

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
    it('should be okay for default address', (done) => {
        chai.request(app)
            .get('/')
            .end((_, res) => {
                res.should.have.status(200);
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
                .end((err, res) => {
                    res.should.have.status(500);
                    expect(res.body.error).to.not.be.null;
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
    });

    describe('Functionality testing', () => {
        it("should return empty object for no db results", (done) => {
            chai.request(app)
                .get('/reports/daily')
                .set('content-type','application/json')
                .send({
                    date: "2004/05/21",
                })
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql({});
                    done();
                });
        });

        it("should return report for db results", (done) => {
            let testDate = "1234/05/06";
            dbConn.removeRecords(testDate);
            dbConn.saveJourney("StartAddress 1", "StopAddress 1", 100.00, testDate);
            dbConn.saveJourney("StartAddress 2", "Stop Address 2", 200.50, testDate);
            chai.request(app)
                .get('/reports/daily')
                .set('content-type','application/json')
                .send({
                    date: testDate,
                })
                .end((_, res) => {
                    res.should.have.status(200);
                    // res.body.should.not.be.eql({});
                    
                    let checkReport = {
                        totalPrice: 300.50
                    }

                    res.body.should.be.eql(checkReport);
                    
                    done();
                });
            })
    })
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
                });

            chai.request(app)
                .get('/reports/daterange')
                .set('content-type','application/json')
                .send({
                    startDate: "2010/05/10",
                    endDate: "2005/05/21"
                })
                .end((_, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('Functionality testing', () => {
        it('should return empty report for no db results', (done) => {
            chai.request(app)
                .get('/reports/daterange')
                .set('content-type','application/json')
                .send({
                    startDate: "2005/05/10",
                    endDate: "2005/05/21"
                })
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql({});
                    done();
                });
        })
    });
});