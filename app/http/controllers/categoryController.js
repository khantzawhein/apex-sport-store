const {PrismaClient, Prisma} = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryController {
    async index(req, res) {
        let categories = await prisma.categories.findMany();
        res.render("admin/category", {categories});
    }

    async store(req, res, next) {
        const {categoryName} = req.body;
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

    async update(req, res, next) {
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

module.exports = new CategoryController();