var express = require('express');
var router = express.Router();

const categoryController = require('../app/http/controllers/categoryController');

/* GET Routes. */
router.get('/admin/category', categoryController.category);

/* POST Routes. */
router.post('/admin/category', categoryController.createCategory);
router.post('/admin/category/edit/:id', categoryController.editCategory);

module.exports = router;