const assert = require('assert');
const dbConn = require('../src/dbConnection');
const { expect } = require('chai');
// const chai = require('chai');
// const chai_http = require('chai-http');


describe('Distance calculation testing', () => {
    it("should return address for test data", (done) => {
        originAddress = "San Francisco, CA"
        destinationAddress = "San Diego, CA"
        let resPromise = dbConn.calculateDistance(originAddress, destinationAddress);
        resPromise.then(res => {
            console.log(res.data.rows[0].elements[0].distance);
            assert.strictEqual(807283,res.data.rows[0].elements[0].distance.value);
            done();
          })
          .catch(err => {
            console.log(`Distance failure: ${err}`)
            done(err);
          });
    });
});

const testDate = "1234/05/06";
describe('Getting daily report', () => {
    before(() => {
        return new Promise((resolve) => {
            const params = {
                originAddress: "San Francisco, CA",
                destinationAddress: "San Diego, CA",
                price: 100.00,
                date: testDate,
                
            }
            dbConn.saveJourney(params, () => {
                params.price = 200.23,
                dbConn.saveJourney(params, resolve);
            });
        }, 2000);
    });

    after(() => {
        dbConn.removeRecords(testDate);
    });

    it("should calculate right values", async() => {
        await dbConn.getDailyReport(testDate, (err, report) => {
            assert.strictEqual(report.totalPrice, 300.23);
            assert.strictEqual(report.totalDistance, 1614.566);
        })
    })
})