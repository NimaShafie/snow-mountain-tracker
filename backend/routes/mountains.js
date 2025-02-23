const express = require('express');
const router = express.Router();
const mountainController = require('../controllers/mountainController');

router.get('/', mountainController.getMountains);

module.exports = router;
