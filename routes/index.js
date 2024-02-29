var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');
const StorefrontController = require('../app/http/controllers/StorefrontController');

var router = express.Router();

/* GET home page. */
router.get('/', StorefrontController.index);


/* GET admin routes. */
router.get('/admin/dashboard', HelloController.dashboard);

router.get('/admin', HelloController.admins);

router.get('/admin/category', HelloController.category);

router.get('/admin/create', HelloController.admincreate);

router.get('/admin/edit', HelloController.adminedit);

module.exports = router;
