const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/navbar-texts', async (req, res) => {
  let lang = req.query.lang === 'sv' ? 'sv' : 'en';
  try {
    const result = await pool.query('SELECT key, ' + lang + ' AS text FROM navbar_texts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch navbar texts.' });
  }
});

module.exports = router;
