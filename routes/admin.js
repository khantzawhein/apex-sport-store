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
router.get('/admins', AdminController.index);
router.get('/admins/create', AdminController.create);
router.get('/admins/edit', AdminController.edit);
router.get('', (req, res) => res.redirect('/admin/dashboard'));

/**
 * Category
 */
router.post('/category/create', CategoryController.store);

router.get('/category', CategoryController.index);
router.get('/category/edit/:id', CategoryController.edit);

router.post('/category', CategoryController.store);
router.post('/category/edit/:id', CategoryController.update);

router.get('/category/delete/:id', CategoryController.delete);
router.post('/category/delete/:id', CategoryController.delete);

module.exports = router;
