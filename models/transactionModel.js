const db = require('./db');

// Add a new transaction
exports.addTransaction = (transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(
    `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
    [type, category, amount, date, description],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

// Get all transactions
exports.getAllTransactions = (callback) => {
  db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    callback(err, rows);
  });
};

// Get transaction by ID
exports.getTransactionById = (id, callback) => {
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    callback(err, row);
  });
};

// Update transaction by ID
exports.updateTransactionById = (id, transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [type, category, amount, date, description, id],
    function (err) {
      callback(err, this.changes);
    }
  );
};

// Delete transaction by ID
exports.deleteTransactionById = (id, callback) => {
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
    callback(err, this.changes);
  });
};

// Get transaction summary (total income, total expenses, balance)
exports.getSummary = (callback) => {
  db.all(
    `SELECT type, SUM(amount) as total FROM transactions GROUP BY type`,
    [],
    (err, rows) => {
      if (err) return callback(err);

      const summary = { totalIncome: 0, totalExpenses: 0, balance: 0 };
      rows.forEach((row) => {
        if (row.type === 'income') summary.totalIncome = row.total;
        else if (row.type === 'expense') summary.totalExpenses = row.total;
      });
      summary.balance = summary.totalIncome - summary.totalExpenses;
      callback(null, summary);
    }
  );
};
