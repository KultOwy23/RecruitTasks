const sqlite3 = require('sqlite3').verbose();
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

const dailySql = "SELECT SUM(price) as totalPrice, SUM(distance) as totalDistance FROM journeys WHERE date = ?";
const dateRangeSql = "SELECT SUM(price) as totalPrice, SUM(distance) as totalDistance FROM journeys WHERE date > ? AND date < ?";
const deleteSql = "DELETE FROM journeys WHERE date = ?"
// open the database
let db = new sqlite3.Database('./db/journeys.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    throw Error(err.message);
  }
  console.log('Connected to the journeys database.');
});
db.run('CREATE TABLE IF NOT EXISTS journeys(date TEXT, originAddress TEXT, destinationAddress TEXT, price REAL, distance REAL)');



calculateDistance = (originAddress, destinationAddress) => {
  return client.distancematrix({
      params: {
        origins: [originAddress],
        destinations: [destinationAddress],
        sensor: false,
        key: process.env.GOOGLE_MAPS_API_KEY
      },
      timeout: 1000 // milliseconds
    }).then(res => {
      return res.data.rows[0].elements[0].distance.value;
    });
}

dbSave = (params) => {
  return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO journeys(date,originAddress,destinationAddress,price,distance) VALUES(?,?,?,?,?)",
        [params.date,params.originAddress,params.destinationAddress,params.price, params.dist],
        (err) => {
          if(err) {
            reject(new Error(`SaveJourneyError: ${err}`));
          }
      });
      resolve({message: 'Saved journey!', distance: params.dist});
  })
}



saveJourney = (params) => {
  let data = params;
  return new Promise(function(resolve, reject) {
    if(!data || Object.keys(data).length === 0) {
      reject(new Error(`Empty params object`));
    }
    params.price = params.price ? params.price*100 : reject(new Error(`Price is empty`));
    resolve(data);
  }).then(params => calculateDistance(params.originAddress, params.destinationAddress)
  ).then(res => {
    data['dist'] = res;
    return dbSave(data);
  })

}

removeRecords = (date) => {
  db.serialize(() => {
    db.run(deleteSql, [date], (err) => {
      if(err) {
        throw new Error(`RemoveRecordsError: ${err}`);
      }
    });
  })
};

getDailyReport = (date) => {
  return new Promise((resolve, reject) => {
    db.get(dailySql, date, (err, row) => {
      if(err) {
        reject(new Error(`GetDailyReport: ${err}`));
      }
      if(row) {
          row.totalPrice = row.totalPrice ? row.totalPrice/100 : null;
          row.totalDistance = row.totalDistance ? row.totalDistance/1000 : null;
      };

      resolve((row && row.totalPrice ? row : {}));
    })
  })
}

getDateRangeReport = (params) => {
  return new Promise((resolve, reject) => {
    db.get(dateRangeSql, [params.startDate, params.endDate], (err, row) => {
      if(err) {
        reject(new Error(`GetDateRangeReport error: ${err}`));
      }
      if(row) {
        row.totalPrice = row.totalPrice ? row.totalPrice/100 : null;
        row.totalDistance = row.totalDistance ? row.totalDistance/1000 : null;
      }
      resolve(row && row.totalPrice ? row : {});
    });
  })
}



module.exports = { db, saveJourney, removeRecords, getDailyReport, getDateRangeReport, calculateDistance};