const { PrismaClient, Prisma } = require('@prisma/client');

const bodyParser = require('body-parser');
bodyParser.urlencoded({ extended: true });

const prisma = new PrismaClient();

class categoryController{
    constructor(){
    }

    category(req, res, next) {
        res.render("admin/category", { title: "Category" });
    }

    async categorycreate(req,res,next){
        const { categoryName } = req.body;
         await prisma.categories.create({ 
            data: {
                name: "Hello"
            }
        });
        const category = await prisma.Categories.findMany();
        console.log(category);
        res.redirect("/admin/category");
    }
}

module.exports = new categoryController();