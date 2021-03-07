const sqlite3 = require('sqlite3').verbose();
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

const dailySql = "SELECT SUM(price) as totalPrice, SUM(distance) as totalDistance FROM journeys WHERE date = ?";
const dateRangeSql = "SELECT SUM(price) as totalPrice, SUM(distance) as totalDistance FROM journeys WHERE date > ? AND date < ?";
const deleteSql = "DELETE FROM journeys WHERE date = ?"
// open the database
let db = new sqlite3.Database('./db/journeys.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the journeys database.');
});
db.run('CREATE TABLE IF NOT EXISTS journeys(date DATE, originAddress TEXT, destinationAddress TEXT, price REAL, distance REAL)');

saveJourney = (params, callback) => {
  const distPromise = calculateDistance(params.originAddress,params.destinationAddress);
  distPromise.then(res => {
    const distance = res.data.rows[0].elements[0].distance;
    if(distance) {
      db.serialize(() => {
        db.run(
          "INSERT INTO journeys(date,originAddress,destinationAddress,price,distance) VALUES(?,?,?,?,?)",
          [params.date,params.originAddress,params.destinationAddress,params.price, distance.value],
          (err) => {
            if(err) {
              callback(`SaveJourneyError: ${err}`);
            }
        });
      })
    }
    callback();
  }).catch(err => {
    callback(err,_);
  })
    
};

removeRecords = (date) => {
  db.serialize(() => {
    db.run(deleteSql, [date], (err) => {
      if(err) {
        throw new Error(`RemoveRecordsError: ${err}`);
      }
    });
  })
};

getDailyReport = (date, callback) => {
  db.serialize(() => {
    db.get(dailySql, date, (err, row) => {
      if(err) {
        callback(`GetDailyReport: ${err}`,_);
      }
      if(row) {
          row.totalDistance = row.totalDistance ? row.totalDistance/1000 : null;
      };

      callback(err,(row && row.totalPrice ? row : {}));
    })
  })
}

getDateRangeReport = (params, callback) => {
  db.serialize(() => {
    db.get(dateRangeSql, [params.startDate, params.endDate], (err, row) => {
      if(err) {
        callback(`GetDateRangeReport error: ${err}`,_);
      }
      if(row) {
        row.totalDistance = row.totalDistance ? row.totalDistance/1000 : null;
      }
      callback(err, (row && row.totalPrice ? row : {}));
    });
  })
}
calculateDistance = (originAddress, destinationAddress) => {
   return client.distancematrix({
      params: {
        origins: [originAddress],
        destinations: [destinationAddress],
        sensor: false,
        language: 'pl',
        key: process.env.GOOGLE_MAPS_API_KEY
      },
      timeout: 1000 // milliseconds
    })
}



module.exports = { db, saveJourney, removeRecords, getDailyReport, getDateRangeReport, calculateDistance};