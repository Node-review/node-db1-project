const express = require('express');

const db = require('./dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.json(accounts);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to get accounts data' })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const account = await db('accounts').where({ id });
    res.json(account[0]);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to get account data' })
  }
});

router.post('/', async (req, res) => {
  try {
    const account = req.body;
    const inserted = await db('accounts').insert(account);
    res.status(201).json(inserted)
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to add account data' })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const account = req.body;
    const { id } = req.params;
    const updated = await db('accounts').where({ id }).update(account);
    res.status(200).json(updated)
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to update account data' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await db('accounts').where({ id }).del();
    res.status(200).json(removed);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to delete account data' })
  }
});

module.exports = router;