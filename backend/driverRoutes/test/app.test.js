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
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});


describe('Adding routes to history', () => {
    describe('Input validation', () => {
        it("should validate start address, stop address, route price, date", (done) => {
            chai.request(app)
                .put('/journeys')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    })
});

describe('Get daily report', () => {
    describe('Input validation', () => {
        it("should validate date in input", (done) => {
            chai.request(app)
                .get('/report/daily')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });
});

describe('Get monthly report', () => {});