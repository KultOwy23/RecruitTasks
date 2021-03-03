const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/journeys.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the journeys database.');
});

module.exports = db;