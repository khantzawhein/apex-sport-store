const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CustomerSignUpRequest = require('../../requests/CustomerSignUpRequest');
const { hashSync, compareSync } = require('bcrypt');

class AuthController {
  loginView(req, res) {
    res.render('storefront/auth/login');
  }

  async login(req, res) {
    const { email, password } = req.body;
    const customer = await prisma.customers.findFirst({
      where: {
        email
      }
    });

    if (!customer || !compareSync(password, customer.password)) {
      req.session.flash = { error: 'Invalid Credentials, Please Try Again.' };
      return req.session.save(() => res.redirect('/login'));
    }
    const cart = req.session.cart;
    const user = req.session.user;
    req.session.regenerate((err) => {
      req.session.cart = cart;
      req.session.user = user;
      req.session.customer = customer;
      req.session.flash = { success: 'Logged In Successfully' };
      req.session.save(() => res.redirect(req.session.last_url || '/account'));
    });
  }

  async signup(req, res, next) {
    const value = await new CustomerSignUpRequest().validate(req.body, next);
    if (!value) return;

    const { full_name, email, password, phone, address } = value;

    const customer = await prisma.customers.create({
      data: {
        name: full_name,
        email,
        password: hashSync(password, 10),
        phone,
        address
      }
    });

    const cart = req.session.cart;

    req.session.regenerate((err) => {
      req.session.cart = cart;
      req.session.customer = customer;
      req.session.flash = { success: 'Account Created Successfully' };
      req.session.save(() => res.redirect('/account'));
    });
  }

  signupView(req, res) {
    res.render('storefront/auth/signup');
  }

  async logout(req, res) {
    req.session.customer = null;
    req.session.flash = { success: 'Logged Out Successfully' };
    req.session.save(() => res.redirect('/'));
  }
}

module.exports = new AuthController();
