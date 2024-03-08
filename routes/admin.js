var express = require('express');
const HelloController = require('../app/http/controllers/HelloController');
const AuthController = require('../app/http/controllers/AuthController');
const StorefrontController = require('../app/http/controllers/StorefrontController');
const AdminController = require('../app/http/controllers/AdminController');
const DashboardController = require('../app/http/controllers/DashboardController');
const CategoryController = require('../app/http/controllers/CategoryController');
const ProductController = require('../app/http/controllers/ProductController');
const CustomerController = require('../app/http/controllers/CustomerController');
const SaleController = require('../app/http/controllers/SaleController');
const InquiryController = require('../app/http/controllers/InquiryController');
const multer = require('multer');
var router = express.Router();
let upload = multer({ dest: 'storage/uploads/' });

router.get('', (req, res) => res.redirect('/admin/dashboard'));
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

/**
 * Customer CRUD
 */
router.get('/customers', CustomerController.index);
router.get('/customers/edit', CustomerController.edit);

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

/**
 * Product
 */
router.get('/products', ProductController.index);
router.get('/products/create', ProductController.create);
router.get('/products/edit/:id', ProductController.edit);
router.post('/products/images/:id/delete', ProductController.deleteImage);
router.post('/products', upload.array('product_images'), ProductController.store);
router.post('/products/:id', upload.array('product_images'), ProductController.update);
router.post('/products/delete/:id', ProductController.delete);

/**
 * Sales
 */
router.get('/sales', SaleController.index);

/**
 * Inquiries
 */
router.get('/inquiries', InquiryController.index);

module.exports = router;
