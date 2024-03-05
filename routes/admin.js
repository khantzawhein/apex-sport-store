var express = require('express');
var router = express.Router();

const adminController = require('../app/http/controllers/adminController');
const dashboardController = require('../app/http/controllers/dashboardController');

/* GET admin routes. */
router.get('/admin', adminController.admins);
router.get('/admin/dashboard', dashboardController.dashboard);
// router.get('/admin/create', adminController.admincreate);
// router.get('/admin/edit', adminController.adminedit);

module.exports = router;