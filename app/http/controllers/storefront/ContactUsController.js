const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ContactUsController {
  index(req, res) {
    res.render('storefront/contact-us');
  }
}

module.exports = new ContactUsController();
