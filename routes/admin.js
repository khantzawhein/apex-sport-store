var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');
const AuthController = require('../app/http/controllers/AuthController');
const StorefrontController = require('../app/http/controllers/StorefrontController');
const AdminController = require('../app/http/controllers/AdminController');
const DashboardController = require('../app/http/controllers/DashboardController');
const CategoryController = require('../app/http/controllers/CategoryController');

var router = express.Router();

/**
 * Authentication
 */
router.get('/logout', AuthController.logout);
router.get('/login', AuthController.loginView);
router.get('/signup', AuthController.signupView);
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

/**
 * Admin Dashboard
 */
router.get('/dashboard', DashboardController.dashboard);

/**
 * Admin CRUD
 */
router.get('admins', AdminController.index);
router.get('admins/create', AdminController.create);
router.get('admins/edit', AdminController.edit);
router.get('', (
    req, res) => res.redirect('/admin/dashboard'));


router.get('/category', CategoryController.index);
router.post('/category', CategoryController.store);
router.post('/category/edit/:id', CategoryController.update);

module.exports = router;
