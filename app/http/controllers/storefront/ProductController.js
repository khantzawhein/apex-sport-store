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
        },
        include: {
          product_images: true,
          categories: true
        }
      });

      const relatedProducts = await prisma.products.findMany({
        where: {
          NOT: {
            id: product.id
          },
          categories: {
            some: {
              category_id: {
                in: product.categories.map((category) => category.category_id)
              }
            }
          }
        },
        take: 10,
        include: {
          product_images: true
        }
      });
      res.render('storefront/products/show', { product, relatedProducts, title: product.name });
    } catch (error) {
      console.log(error);
      next(createError(404, 'Product not found'));
    }
  }

  index = async (req, res, next) => {
    try {
      const search = req.query.q;
      const page = Math.abs(req.query.page) || 1;
      const perPage = 15;
      const query = search
        ? {
            where: {
              name: {
                contains: search
              }
            }
          }
        : {};
      const productCount = await prisma.products.count(query);
      if (req.xhr) {
        return res.json(await this.getJsonResponseForProducts(query, productCount, page, perPage));
      }
      res.render('storefront/products/index', {
        totalPages: Math.ceil(productCount / perPage),
        currentPage: page,
        type: search ? 'search' : 'all',
        title: search ? 'Search Results' : 'All Products',
        search
      });
    } catch (error) {
      console.log(error);
      next(createError(404, 'Product not found'));
    }
  };

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
      const query = {
        where: {
          categories: {
            some: { category_id: category.id }
          }
        }
      };
      const page = Math.abs(req.query.page) || 1;
      const perPage = 15;
      const productCount = await prisma.products.count(query);
      if (req.xhr) {
        return res.json(await this.getJsonResponseForProducts(query, productCount, page, perPage));
      }
      res.render('storefront/products/index', {
        category,
        totalPages: Math.ceil(productCount / perPage),
        currentPage: page,
        type: 'category',
        title: `${category.name}`
      });
    } catch (error) {
      console.log(error);
      return next(createError(404, 'Category not found'));
    }
  };

  async redirectForType(req, res, next) {
    try {
      const slug = req.params.slug;
      const categoryType = await prisma.category_Types.findFirstOrThrow({
        where: {
          slug
        },
        include: {
          categories: true
        }
      });

      const categorySlug = categoryType.categories[0]?.slug;

      if (categorySlug) return res.redirect(`/categories/${categorySlug}`);
      return next(createError(404, 'Not Found Category Type'));
    } catch (error) {
      return next(createError(404, 'Not Found Category Type'));
    }
  }

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
