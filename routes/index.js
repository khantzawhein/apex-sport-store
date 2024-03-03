var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');
const authController = require('../app/http/controllers/authController');
const StorefrontController = require('../app/http/controllers/StorefrontController');
const dashboardController = require('../app/http/controllers/dashboardController');
const categoryController = require('../app/http/controllers/categoryController');

var router = express.Router();

/* GET home page. */
router.get('/', StorefrontController.index);

router.get('/logout', authController.logout);

/* GET login page. */
router.get('/login', HelloController.login);
router.get('/signup', HelloController.signup);

/* POST login page. */
router.post('/login', authController.login);
router.post('/signup', authController.signup);

/* GET admin routes. */
router.get('/admin/dashboard', dashboardController.dashboard);
router.get('/admin', HelloController.admins);

router.get('/admin/create', HelloController.admincreate);
router.get('/admin/edit', HelloController.adminedit);


/* Category routes. */
router.get('/admin/category', categoryController.category);
router.post('/admin/category', categoryController.categorycreate);


module.exports = router;
