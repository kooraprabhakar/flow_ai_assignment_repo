const transactionModel = require('../models/transactionModel');

// Add a new transaction
exports.addTransaction = (req, res) => {
  const transaction = req.body;
  transactionModel.addTransaction(transaction, (err, id) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ message: 'Transaction added', id });
  });
};

// Get all transactions
exports.getAllTransactions = (req, res) => {
  transactionModel.getAllTransactions((err, transactions) => {
    if (err) return res.status(500).send(err.message);
    res.json(transactions);
  });
};

// Get transaction by ID
exports.getTransactionById = (req, res) => {
  const id = req.params.id;
  transactionModel.getTransactionById(id, (err, transaction) => {
    if (err) return res.status(500).send(err.message);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  });
};

// Update a transaction
exports.updateTransactionById = (req, res) => {
  const id = req.params.id;
  const transaction = req.body;
  transactionModel.updateTransactionById(id, transaction, (err, changes) => {
    if (err) return res.status(500).send(err.message);
    if (changes === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction updated' });
  });
};

// Delete a transaction
exports.deleteTransactionById = (req, res) => {
  const id = req.params.id;
  transactionModel.deleteTransactionById(id, (err, changes) => {
    if (err) return res.status(500).send(err.message);
    if (changes === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  });
};

// Get transaction summary
exports.getSummary = (req, res) => {
  transactionModel.getSummary((err, summary) => {
    if (err) return res.status(500).send(err.message);
    res.json(summary);
  });
};
