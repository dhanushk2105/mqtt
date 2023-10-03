import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS mqtt_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id TEXT,
        meter_value_record TEXT
      )
    `);
  });

export default db;