const sqlite3 = require('sqlite3').verbose();

const dailySql = "SELECT * FROM journeys WHERE date = ?";
const dateRangeSql = "SELECT * FROM journeys WHERE date > ? AND date < ?";
const deleteSql = "DELETE FROM journeys WHERE date = ?"
// open the database
let db = new sqlite3.Database('./db/journeys.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the journeys database.');
});
db.run('CREATE TABLE IF NOT EXISTS journeys(date DATE, startAddress TEXT, stopAddress TEXT, price REAL)');

saveJourney = (startAddress, endAddress, price, date) => {
  db.serialize(() => {
    db.run(
      "INSERT INTO journeys(date,startAddress,stopAddress,price) VALUES(?,?,?,?)",
      [date,startAddress,endAddress,price],
      (err) => {
        if(err) {
          throw new Error(`SaveJourneyError: ${err}`);
        }
    });
  });
    
    console.log(`Journey saved!`);
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

getDailyReport = (date) => {
  db.serialize(() => {
    db.all(dailySql, date, (err, rows) => {
      if(err) {
        throw new Error(`GetDailyReport: ${err}`);
      }
      let report = {}
      rows.forEach(row => {
        if(report.totalPrice) {
          report.totalPrice += row.price;
        } else {
          report['totalPrice'] = row.price;
        }
      });
      return report;
    })
  })
}



module.exports = { db, saveJourney, removeRecords, getDailyReport };