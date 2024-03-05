const { PrismaClient } = require('@prisma/client');
const { hashSync, compareSync } = require('bcrypt');

const prisma = new PrismaClient();

class authController {
    constructor() {
        console.log('authController constructor');
    }

    async signup(req, res, next) {
        //auth and add to mysql db using prisma
        const {name, username, password} = req.body;

        //check if user exists
        if (!(await prisma.admin.findMany({ where: {username}}))) {
            console.log(await prisma.admin.findMany({ where: {username}}));
            return res.status(400).json({
                message: 'User already exists'
            });
        }else {
            const user = await prisma.admin.create({
                data: {
                    name,
                    username,
                    password: hashSync(password, 10)
                }
            });

            res.redirect('/login');
        }
    }
    
    async login(req, res, next) {

        if (req.session.user) {
            return res.redirect('/admin/testing');
        }

        //auth and add to mysql db using prisma
        const {username, password} = req.body;
        const user = await prisma.admin.findFirst({ where: {username} });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid username'
            });
        }

        if (!compareSync(password, user.password)) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        req.session.user = user;
        req.session.save();
        res.redirect('admin/dashboard');
    }
    
    async logout(req, res, next) {
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = new authController();