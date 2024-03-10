const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');
const prisma = new PrismaClient();
const ejs = require('ejs');

class ProductController {
  async show(req, res, next) {
    try {
      const product = await prisma.products.findFirstOrThrow({
        where: {
          slug: req.params.slug
        }
      });
      res.render('products/show', { product });
    } catch (error) {
      next(createError(404, 'Product not found'));
    }
  }

  async index(req, res, next) {}

  indexByCategory = async (req, res, next) => {
    const categorySlug = req.params.slug;

    try {
      const category = await prisma.categories.findFirstOrThrow({
        where: {
          slug: categorySlug
        },
        include: {
          category_type: {
            include: {
              categories: true
            }
          }
        }
      });
      let query = {};
      if (category.slug === 'all-products') {
        query = {};
      } else {
        query = {
          where: {
            categories: {
              some: { category_id: category.id }
            }
          }
        };
      }
      const page = Math.abs(req.query.page) || 1;
      const perPage = 15;
      const productCount = await prisma.products.count(query);
      if (req.xhr) {
        return res.json(await this.getJsonResponseForProducts(query, productCount, page, perPage));
      }
      res.render('storefront/products/index', {
        category,
        totalPages: Math.ceil(productCount / perPage),
        currentPage: page
      });
    } catch (error) {
      console.log(error);
      return next(createError(404, 'Category not found'));
    }
  };

  async getJsonResponseForProducts(query, productCount, page, perPage = 15) {
    const products = await prisma.products.findMany({
      ...query,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        product_images: true
      }
    });
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        `${global.__basedir}/resources/views/storefront/products/partials/product-card.ejs`,
        { products },
        (err, str) => {
          if (err) reject(err);
          return resolve({
            html: str,
            pagination: {
              current_page: 1,
              total_pages: Math.ceil(productCount / perPage)
            }
          });
        }
      );
    });
  }
}

module.exports = new ProductController();
