var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');

var router = express.Router();

/* GET home page. */
router.get('/', HelloController.index);


/* GET admin routes. */
router.get('/admin/dashboard', HelloController.dashboard);

router.get('/admins', HelloController.admins);

router.get('/admin/category', HelloController.category);

router.get('/admin/create', HelloController.admincreate);

router.get('/admin/edit', HelloController.adminedit);

module.exports = router;
