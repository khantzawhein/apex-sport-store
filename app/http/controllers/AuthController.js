const {PrismaClient} = require('@prisma/client');
const {hashSync, compareSync} = require('bcrypt');

const prisma = new PrismaClient();

class AuthController {
    async signupView(req, res, next) {
        if (req.session.user) return res.redirect('/admin');
        res.render('admin/auth/signup', {title: 'Sign Up'});
    }

    async loginView(req, res, next) {
        res.render('admin/auth/login', {title: 'Login'});
    }

    async signup(req, res, next) {
        //auth and add to mysql db using prisma
        const {name, username, password} = req.body;

        //check if user exists
        if (!(await prisma.admin.findMany({where: {username}}))) {
            req.session.error = 'User already exists';
            return res.redirect('/admin/login')
        } else {
            const user = await prisma.admin.create({
                data: {
                    name,
                    username,
                    password: hashSync(password, 10)
                }
            });

            res.redirect('/admin/login');
        }
    }

    async login(req, res, next) {
        //auth and add to mysql db using prisma
        const {username, password} = req.body;
        const user = await prisma.admin.findFirst({where: {username}});

        if (!user || !compareSync(password, user.password)) {
            req.session.flash = {error: 'Invalid Credentials, Please Try Again.'};
            return req.session.save(() => res.redirect('/admin/login'));
        }

        req.session.user = user;
        req.session.save(() => res.redirect('/admin'))
    }

    async logout(req, res, next) {
        req.session.destroy();
        res.redirect('/admin/login');
    }
}

module.exports = new AuthController();