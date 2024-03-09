const { PrismaClient } = require('@prisma/client');
const { hashSync, compareSync } = require('bcrypt');
const SignUpRequest = require('../requests/SignUpRequest');

const prisma = new PrismaClient();

class AuthController {
  async signupView(req, res, next) {
    res.render('admin/auth/signup', { title: 'Sign Up' });
  }

  async loginView(req, res, next) {
    res.render('admin/auth/login', { title: 'Login' });
  }

  async signup(req, res, next) {
    const value = await new SignUpRequest().validate(req.body, next);

    if (!value) return;

    const { name, username, password, email } = value;

    //check if user exists
    if ((await prisma.admin.findMany({ where: { username } })).length > 0) {
      req.session.flash = { error: 'Username already exists' };
      return req.session.save(() => res.redirect('/admin/signup'));
    } else {
      await prisma.admin.create({
        data: {
          name,
          username,
          email,
          password: hashSync(password, 10)
        }
      });
      req.session.flash = { success: 'Account created successfully' };
      req.session.save(() => res.redirect('/admin/admins'));
    }
  }

  async login(req, res, next) {
    //auth and add to mysql db using prisma
    const { username, password } = req.body;
    const user = await prisma.admin.findFirst({ where: { username } });

    if (!user || !compareSync(password, user.password)) {
      req.session.flash = { error: 'Invalid Credentials, Please Try Again.' };
      return req.session.save(() => res.redirect('/admin/login'));
    }
    req.session.regenerate((err) => {
      req.session.user = user;
      req.session.save(() => res.redirect('/admin'));
    });
  }

  async logout(req, res, next) {
    req.session.destroy();
    res.redirect('/admin/login');
  }
}

module.exports = new AuthController();
