var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');

var router = express.Router();

/* GET home page. */
router.get('/', HelloController.index);


/* GET admin dashboard. */
router.get('/admin/dashboard', HelloController.dashboard);
module.exports = router;
