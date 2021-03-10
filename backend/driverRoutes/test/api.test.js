const app = require("../app");
const chai = require("chai");
const chai_http = require("chai-http");
const dbConn = require("../src/dbConnection");
const { expect } = require("chai");

chai.use(chai_http);
chai.should();

describe("General app tests", () => {
    it("should return 404 for undefined route", (done) => {
        chai.request(app)
            .get("/unknown")
            .end((_, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it("should be okay for default address", (done) => {
        chai.request(app)
            .get("/")
            .end((_, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


describe("Adding routes to history", () => {
    describe("Input validation", () => {
        it("should return error for no input", (done) => {
            chai.request(app)
                .post("/journeys")
                .end((_, res) => {
                    res.should.have.status(500);
                    expect(res.body.error).to.not.be.null;
                    expectedErrorMessages = [
                        {"msg": "is required", "param": "originAddress", "location": "body"},
                        {"msg": "is required", "param": "destinationAddress", "location": "body"},
                        {"msg": "Is required, and has to be decimal", "param": "price", "location": "body"},
                        {"msg": "Should be a date in format YYYY/MM/DD", "param": "date", "location": "body"}
                    ]
                    expect(res.body.errors).to.eql(expectedErrorMessages);
                    done();
                });
        });

        it("should return error for invalid input", (done) => {
            chai.request(app)
                .post("/journeys")
                .set("content-type","application/json")
                .send({
                    date: "ABCD",
                    originAddress: "Nice",
                    destinationAddress: "Here is stop",
                    price: "12A"
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    expect(res.body.error).to.not.be.null;
                    expectedErrorMessages = [
                        {"value": "12A", "msg": "Is required, and has to be decimal", "param": "price", "location": "body"},
                        {"value": "ABCD", "msg": "Should be a date in format YYYY/MM/DD", "param": "date", "location": "body"}
                    ]
                    expect(res.body.errors).to.eql(expectedErrorMessages);
                    done();
                });
        });
    })
    describe('Saving journeys validation', () => {
        it("should save the journey with valid data", (done) => {
            chai.request(app)
                .post("/journeys")
                .set("content-type","application/json")
                .send({
                    date: "2021/03/07",
                    originAddress: "San Francisco, CA",
                    destinationAddress: "San Diego, CA",
                    price: 200.99
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    expect(res.body).to.not.be.null;
                    expect(res.body.message).to.be.eql("Saved journey!");
                    expect(res.body.distance).to.be.eql(807283)
                    done();
                })
        });
    })
});

describe("Get daily report", () => {
    describe("Input validation", () => {
        it("should return error for no input", (done) => {
            chai.request(app)
                .get("/reports/daily")
                .end((_, res) => {
                    res.should.have.status(500);
                    done();
                })
        });

        it("should return error for invalid input", (done) => {
            chai.request(app)
                .get("/reports/daily")
                .set("content-type","application/json")
                .send({
                    date: "ABCD",
                })
                .end((_, res) => {
                    const expectedErrorMessages = [
                        {"value": "ABCD", "msg": "has to be date", "param": "date", "location": "body"}
                    ]
                    res.should.have.status(500);
                    expect(res.body.errors).to.eql(expectedErrorMessages);
                    done();
                });
        });
    });

    describe("Functionality testing", () => {
        let testDate = "2077/03/01";
        before(() => {
            dbConn.removeRecords(testDate);
            const params = [
                {
                    originAddress: "San Francisco, CA",
                    destinationAddress: "San Diego, CA",
                    price: 100.00,
                    date: testDate,
                },
                {
                    originAddress: "San Francisco, CA",
                    destinationAddress: "San Diego, CA",
                    price: 200.23,
                    date: testDate,
                }
            ]
            return dbConn.saveJourney(params[0]).then(() => {
                return dbConn.saveJourney(params[1]);

            })
        });

        after(() => {
            dbConn.removeRecords(testDate);
        });

        it("should return empty object for no db results", (done) => {
            chai.request(app)
                .get("/reports/daily")
                .set("content-type","application/json")
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
            chai.request(app)
            .get("/reports/daily")
            .set("content-type","application/json")
            .send({
                date: testDate,
            })
            .end((_, res) => {
                res.should.have.status(200);
                res.body.should.not.be.eql({});
                
                let checkReport = {
                    totalPrice: 300.23,
                    totalDistance: 1614.566
                }

                res.body.should.be.eql(checkReport);
                
                done();
            });
        });
    })
});

describe("Get report for date range", () => {
    describe("Input validation", () => {
        it("should return error for no input", (done) => {
            chai.request(app)
                .get("/reports/daterange")
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("should return error for invalid input", (done) => {
            chai.request(app)
                .get("/reports/daterange")
                .set("content-type","application/json")
                .send({
                    startDate: "2004/05/21",
                    endDate: "ABCD"
                })
                .end((_, res) => {
                    res.should.have.status(500);
                });
            
            chai.request(app)
                .get("/reports/daterange")
                .set("content-type","application/json")
                .send({
                    startDate: "ABCD",
                    endDate: "2005/05/21"
                })
                .end((_, res) => {
                    res.should.have.status(500);
                });

            chai.request(app)
                .get("/reports/daterange")
                .set("content-type","application/json")
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

    describe("Functionality testing", () => {
        it("should return empty report for no db results", (done) => {
            chai.request(app)
                .get("/reports/daterange")
                .set("content-type","application/json")
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