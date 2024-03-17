const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ContactUsController {
  index(req, res) {
    res.render('storefront/contact-us', {title: 'Contact Us'});
  }
}

module.exports = new ContactUsController();
