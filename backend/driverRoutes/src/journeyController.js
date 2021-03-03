const db = require('./dbConnection');

class DataController {
    constructor() {}

    saveJourney(input) {
        console.log('Save Journey');
    }

    getDailyReport(date) {
        console.log('Get daily report');
    }

    getPeriodReport(startDate, endDate) {
        console.log('Get periodical report');
    }
}