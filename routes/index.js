var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');
const StorefrontController = require('../app/http/controllers/StorefrontController');
const authController = require('../app/http/controllers/authController');
const StorefrontController = require('../app/http/controllers/StorefrontController');

var router = express.Router();

/* GET home page. */
router.get('/', StorefrontController.index);

router.get('/testing', HelloController.testing);
router.get('/logout', authController.logout);

/* GET login page. */
router.get('/login', HelloController.login);
router.get('/signup', HelloController.signup);

/* POST login page. */
router.post('/login', authController.login);
router.post('/signup', authController.signup);

/* GET admin routes. */
router.get('/admin/dashboard', HelloController.dashboard);

router.get('/admin', HelloController.admins);

router.get('/admin/category', HelloController.category);

router.get('/admin/create', HelloController.admincreate);

router.get('/admin/edit', HelloController.adminedit);

module.exports = router;
