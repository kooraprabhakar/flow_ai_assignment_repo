const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/expenseTracker.db');

db.serialize(() => {
  // Create Categories Table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT
  )`);

  // Create Transactions Table
  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    category TEXT,
    amount REAL,
    date TEXT,
    description TEXT
  )`);
});

module.exports = db;
