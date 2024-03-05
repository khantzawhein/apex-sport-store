const express = require('express');
const StorefrontController = require('../app/http/controllers/StorefrontController');

const router = express.Router();

router.get('/', StorefrontController.index);

module.exports = router;