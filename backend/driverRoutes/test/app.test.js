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
            console.log(`SaveJourney res: ${res}`);
            done();
        }).catch(err => {
            console.log(`Save Journey error: ${err}`);
            done(err);
        })
    });
});

const testDate = "2021/03/06";
describe('Getting daily report', () => {
    before(() => {
        dbConn.removeRecords(testDate);
        let params = {
            originAddress: "San Francisco, CA",
            destinationAddress: "San Diego, CA",
            price: 100.00,
            date: testDate,   
        }
         
        return dbConn.saveJourney(params).then(() => {
            params.price = 100.23;
            return dbConn.saveJourney(params);

        });

    });

    after(() => {
        dbConn.removeRecords(testDate);
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
})