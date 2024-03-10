const express = require('express');
const HomePageController = require('../app/http/controllers/storefront/HomePageController');
const ProductController = require('../app/http/controllers/storefront/ProductController');

const router = express.Router();

router.get('/', HomePageController.index);
router.get('/categories/:slug/products/', ProductController.indexByCategory);
router.get('/products', ProductController.index);
router.get('/products/:slug', ProductController.show);

module.exports = router;
