const express = require('express');
const HomePageController = require('../app/http/controllers/storefront/HomePageController');
const ProductController = require('../app/http/controllers/storefront/ProductController');
const AuthController = require('../app/http/controllers/storefront/AuthController');
const { Router } = require('express');
const ContactUsController = require('../app/http/controllers/storefront/ContactUsController');
const CartController = require('../app/http/controllers/storefront/CartController');
const CheckoutController = require('../app/http/controllers/storefront/CheckoutController');
const StorefrontAuth = require('../app/http/middlewares/StorefrontAuth');
const AccountController = require('../app/http/controllers/storefront/AccountController');

const router = express.Router();

router.get('/login', AuthController.loginView);
router.post('/login', AuthController.login);
router.get('/signup', AuthController.signupView);
router.post('/signup', AuthController.signup);
router.get('/logout', StorefrontAuth, AuthController.logout);

router.get('/', HomePageController.index);
router.get('/categories/:slug', ProductController.indexByCategory);
router.get('/products', ProductController.index);
router.get('/products/:slug', ProductController.show);

router.get('/contact-us', ContactUsController.index);
router.post('/contact-us', ContactUsController.store);

router.get('/cart', CartController.index);
router.post('/cart', CartController.store);
router.post('/cart/update', CartController.update);

router.post('/checkout', StorefrontAuth, CheckoutController.store);

router.get('/account', StorefrontAuth, AccountController.index);
router.get('/thank-you', (req, res) => res.render('storefront/thank-you', { title: 'Order Confirmed' }));

module.exports = router;
