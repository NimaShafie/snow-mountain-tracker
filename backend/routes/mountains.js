const express = require('express');
const router = express.Router();
const db = require('../models/database');
const weatherSync = require('../jobs/weatherSync');
const mountainController = require('../controllers/mountainController');

router.get('/', mountainController.getMountains);

router.post('/refresh', async (req, res) => {
  try {
    await weatherSync.runOnce();
    res.status(200).json({ message: 'Mountain weather refreshed.' });
  } catch (err) {
    console.error('❌ Manual weather refresh failed:', err.message);
    res.status(500).json({ error: 'Failed to refresh weather' });
  }
});

router.post('/refresh-one', async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Missing name" });

  try {
    const [rows] = await db.query("SELECT * FROM mountains WHERE name = ?", [name]);
    if (!rows.length) return res.status(404).json({ message: "Mountain not found" });

    const mountain = rows[0];
    await weatherSync.refreshSingleMountain(mountain);

    res.json({ message: "Mountain updated", name });
  } catch (err) {
    console.error("❌ Error refreshing single mountain:", err.message);
    res.status(500).json({ error: "Failed to refresh mountain" });
  }
});

module.exports = router;
