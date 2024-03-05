const { PrismaClient, Prisma } = require('@prisma/client');

const bodyParser = require('body-parser');
bodyParser.urlencoded({ extended: true });

const prisma = new PrismaClient();

class categoryController{
    constructor(){
    }

    async category(req, res, next) {
        let categories = await prisma.categories.findMany();
        res.render("admin/category", { categories });
    }

    async createCategory(req,res,next){
        const { categoryName } = req.body;
        const slug = categoryName.toLowerCase().split(' ').join('-');

         await prisma.categories.create({ 
            data: {
                name: categoryName,
                slug: slug
            }
        });
        const category = await prisma.Categories.findMany();
        console.log(category);
        res.redirect("/admin/category");
    }

    async editCategory(req,res,next){
        await prisma.categories.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name: req.body.categoryName,
                slug: req.body.categoryName.toLowerCase().split(' ').join('-')
            }
        });
    }
}

module.exports = new categoryController();