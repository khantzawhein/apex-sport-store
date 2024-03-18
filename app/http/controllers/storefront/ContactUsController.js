const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ContactUsRequest = require('../../requests/ContactUsRequest');

class ContactUsController {
  index(req, res) {
    res.render('storefront/contact-us', { title: 'Contact Us' });
  }

  async store(req, res, next) {
    const value = await new ContactUsRequest().validate(req.body, next);
    if (!value) return;
    const { first_name, last_name, email, phone, message } = value;
    await prisma.inquiries.create({
      data: {
        name: `${first_name} ${last_name}`,
        phone,
        email,
        message
      }
    });
    req.session.flash = { success: 'Your message has been sent successfully' };
    req.session.save(() => res.redirect('/contact-us'));
  }
}

module.exports = new ContactUsController();
