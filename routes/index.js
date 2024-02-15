var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');

var router = express.Router();

/* GET home page. */
router.get('/', HelloController.index);


/* GET admin routes. */
router.get('/admin/dashboard', HelloController.dashboard);

router.get('/admin/category', HelloController.category);

module.exports = router;
