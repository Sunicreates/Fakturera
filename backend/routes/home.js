const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/home-texts', async (req, res) => {
  let lang = req.query.lang === 'sv' ? 'sv' : 'en';
  try {
    const result = await pool.query('SELECT terms, close, main FROM home_texts WHERE lang = $1 LIMIT 1', [lang]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json({ terms: 'Terms', close: 'Close and Go Back', main: '...' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch home texts.' });
  }
});

module.exports = router;
