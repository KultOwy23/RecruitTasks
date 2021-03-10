const assert = require('assert');
const { expect } = require('chai');
const dbConn = require('../src/dbConnection');

describe('Distance calculation testing', () => {
    it("should return address for test data", (done) => {
        originAddress = "San Francisco, CA"
        destinationAddress = "San Diego, CA"
        let resPromise = dbConn.calculateDistance(originAddress, destinationAddress);
        resPromise.then(res => {
            assert.strictEqual(807283,res);
            done();
          })
          .catch(err => {
            console.log(`Distance failure: ${err}`)
            done(err);
          });
    });

    it("should throw error for invalid address", (done) => {
        originAddress = 1234
        destinationAddress = "San Diego, CA"
        dbConn.calculateDistance(originAddress, destinationAddress)
            .then(res => {
                done(res);
            }).catch(err => {
                expect(err).not.to.be.null;
                done();
            });
    });
});

describe('Saving journey testing', () => {
    it("should throw an error for empty params", (done) => {
        dbConn.saveJourney(null)
            .then(res => {
                done(res);
            })
            .catch(err => {
                expect(err).to.not.be.null;
                done();
            })
    });

    it("should save the valid journey", (done) => {
        const params = {
            originAddress: "San Francisco, CA",
            destinationAddress: "San Diego, CA",
            price: 100.00,
            date: testDate,   
        } 
        dbConn.saveJourney(params).then(res => {
            expect(res).to.not.be.null;
            expect(res.message).to.be.eql('Saved journey!')
            expect(res.distance).to.be.eql(807283)
            done();
        }).catch(err => {
            done(err);
        })
    });
});

const testDate = "2021/03/06";
describe('Getting daily report', () => {
    before(() => {
        dbConn.removeRecords();
        let params = [
            {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 100.00,
                date: testDate  
            },
            {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 100.23,
                date: testDate  
            },
            {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 100.00,
                date: '2021/03/07'  
            },
        ]
         
        return dbConn.saveJourney(params[0]).then(() => {
            return dbConn.saveJourney(params[1]).then(() => {
                return dbConn.saveJourney(params[2]);
            });

        });

    });

    after(() => {
        dbConn.removeRecords();
    });

    it("should calculate right values", (done) => {
        dbConn.getDailyReport(testDate).then(res => {
            expect(res).to.not.be.null;
            expect(res.totalPrice).to.be.eql(200.23);
            expect(res.totalDistance).to.be.eql(1614.566)
            done()
        }).catch(err => {
            done(err);
        })
    })

    describe("sql injection testing", (done) => {
        it("should not consider OR 1=1", (done) => {
            dbConn.getDailyReport(`${testDate} OR 1=1`).then(res => {
                expect(res).to.not.be.null;
                expect(res).to.be.eql({});
                done()
            }).catch(err => {
                done(err);
            })
        })
        it("should not allow to drop table", (done) => {
            dbConn.getDailyReport(`${testDate}; DROP TABLE journeys`).then(res => {
                expect(res).to.not.be.null;
                expect(res).to.be.eql({});
                dbConn.getDailyReport(testDate).then(res => {
                    expect(res).to.not.be.null;
                    expect(res.totalPrice).to.be.eql(200.23);
                    expect(res.totalDistance).to.be.eql(1614.566)
                    done()
                }).catch(err => {
                    done(err);
                })
            }).catch(err => {
                done(err);
            })
        })
    })
});

describe("Getting date range report", () => {
    before(() => {
        dbConn.removeRecords();
        let params = [
            {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 100.00,
                date: '2021/03/04',   
            },
            {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 100.23,
                date: '2021/03/05',   
            },
            {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 200.40,
                date: '2021/03/06',   
            },
        
        ]
        
        return dbConn.saveJourney(params[0]).then((res) => {
            return dbConn.saveJourney(params[1]).then(() => {
                return dbConn.saveJourney(params[2]);
            })
        });
    })

    after(() => {
        dbConn.removeRecords()
    });

    it("should return date range report", (done) => {
        dbConn.getDateRangeReport({startDate: '2021/03/04', endDate: '2021/03/06'})
            .then((res) => {
                expect(res.totalPrice).to.be.eql(400.63);
                expect(res.totalDistance).to.be.eql(2421.849);
                done();
            }).catch((err) => {
                done(err);
            })
    })

    describe("SQL Injection security", () => {
        it("should be prone for sql injection in endDate", (done) => {
            dbConn.getDateRangeReport({startDate: '2021/03/04', endDate: '2021/03/05; OR 1=1'})
                .then((res) => {
                    expect(res.totalPrice).to.be.eql(200.23);
                    expect(res.totalDistance).to.be.eql(1614.566);
                    done();
                }).catch((err) => {
                    done(err);
                })
        });

        it("should be prone for sqlInjection in startDate", (done) => {
            dbConn.getDateRangeReport({startDate: '2021/03/04 AND 2021/03/05; SELECT * FROM journeys WHERE date BETWEEN 2000/01/01 ', endDate: '2021/03/04'})
                .then((res) => {
                    expect(res).to.be.eql({})
                    done();
                }).catch((err) => {
                    done(err);
                })
        });
    })
})