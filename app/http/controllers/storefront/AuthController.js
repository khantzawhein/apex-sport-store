const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthController {
  loginView(req, res) {
    res.render('storefront/auth/login');
  }

  async login(req, res) {}

  async signup(req, res) {}

  signupView(req, res) {
    res.render('storefront/auth/signup');
  }

  async logout(req, res) {}
}

module.exports = new AuthController();
