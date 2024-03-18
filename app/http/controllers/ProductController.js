const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const ProductRequest = require('../requests/ProductRequest');

const prisma = new PrismaClient();

class ProductController {
  async index(req, res, next) {
    const categoryId = req.query.category_id;
    const bestSeller = req.query.best_seller || false;
    const products = await prisma.products.findMany({
      where: {
        categories: {
          some: {
            category_id: categoryId ? parseInt(categoryId) : undefined
          }
        }
      },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        product_images: true
      },
      orderBy: {
        sales_count: 'desc'
      },
      ...(bestSeller
        ? {
            take: 10
          }
        : {})
    });
    res.render('admin/products/index', { title: 'Product List', products });
  }

  async create(req, res, next) {
    const categories = await prisma.categories.findMany();
    res.render('admin/products/create', {
      title: 'Create Product',
      categories
    });
  }

  store = async (req, res, next) => {
    const value = await new ProductRequest().validate(req.body, next);

    if (!value) return;
    let categories = this.getCategories(req);

    let images = req.files ? this.saveImages(req.files) : [];
    await prisma.$transaction(async (prisma) => {
      const product = await prisma.products.create({
        data: {
          name: req.body.product_name,
          price: parseFloat(req.body.product_price) || 0,
          promotional_price: parseFloat(req.body.discount_price) || null,
          description: req.body.product_description,
          is_featured_product: !!req.body.is_featured_product,
          is_new_product: !!req.body.is_new_product,
          categories: {
            create: categories
          },
          sales_count: 0,
          slug: '',
          product_images: {
            createMany: {
              data: images
            }
          }
        }
      });
      await prisma.products.update({
        where: {
          id: product.id
        },
        data: {
          slug: req.body.product_name.replace(/\s/g, '-').toLowerCase() + '-' + product.id
        }
      });
    });

    req.session.flash = {
      success: 'Product created successfully'
    };

    req.session.save(() => {
      res.redirect('/admin/products');
    });
  };

  getCategories(req) {
    return req.body.categories
      ? req.body.categories.map((category) => {
          return {
            category: {
              connect: { id: parseInt(category) }
            }
          };
        })
      : [];
  }

  saveImages(files) {
    return files.map((file) => {
      // move file to public folder
      const fileName = `${file.filename}.${file.originalname.split('.')[1]}`;
      const newRelativePath = path.join('uploads', 'product_images');
      const newDirPath = path.join(global.__basedir, 'public', newRelativePath);
      fsExtra.ensureDirSync(newDirPath);

      const newFilePath = path.join(newDirPath, fileName);
      fs.renameSync(path.join(global.__basedir, file.path), newFilePath);
      return { image_path: path.join(newRelativePath, fileName), image_name: file.originalname };
    });
  }

  async edit(req, res, next) {
    const id = req.params.id;
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        categories: true,
        product_images: true
      }
    });
    const categories = await prisma.categories.findMany();
    res.render('admin/products/edit', { title: 'Edit Product', product, categories });
  }

  update = async (req, res, next) => {
    const value = await new ProductRequest().validate(req.body, next);
    if (!value) return;
    const id = parseInt(req.params.id);
    const product = await prisma.products.findUnique({
      where: {
        id
      }
    });
    if (!product) {
      req.session.flash = { error: 'Product not found' };
      return req.session.save(() => {
        res.redirect('/admin/products');
      });
    }
    let images = req.files ? this.saveImages(req.files) : [];
    let categories = this.getCategories(req);

    await prisma.$transaction(async (prisma) => {
      await prisma.product_Category.deleteMany({
        where: {
          product_id: id
        }
      });
      await prisma.products.update({
        where: {
          id
        },
        data: {
          name: req.body.product_name,
          slug: req.body.product_name.replace(/\s/g, '-').toLowerCase() + '-' + id,
          price: parseFloat(req.body.product_price) || 0,
          promotional_price: parseFloat(req.body.discount_price) || 0,
          description: req.body.product_description,
          is_featured_product: !!req.body.is_featured_product,
          is_new_product: !!req.body.is_new_product,
          categories: {
            create: categories
          },
          product_images: {
            createMany: {
              data: images
            }
          }
        }
      });
    });

    req.session.flash = {
      success: 'Product updated successfully'
    };

    req.session.save(() => {
      res.redirect('/admin/products');
    });
  };

  async deleteImage(req, res, next) {
    const id = req.params.id;
    const image = await prisma.product_Images.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (!image) {
      req.session.flash = { error: 'Image not found' };
      return req.session.save(() => {
        res.redirect('/admin/products');
      });
    }
    fsExtra.remove(path.join(global.__basedir, 'public', image.image_path));
    await prisma.product_Images.delete({
      where: {
        id: parseInt(id)
      }
    });
    req.session.flash = {
      success: 'Image deleted successfully'
    };
    req.session.save(() => {
      res.redirect('/admin/products/edit/' + image.product_id);
    });
  }

  async delete(req, res, next) {
    const id = req.params.id;
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        product_images: true,
        categories: true
      }
    });
    product.product_images.forEach((image) => {
      fsExtra.remove(path.join(global.__basedir, 'public', image.image_path));
    });
    await prisma.products.delete({
      where: {
        id: parseInt(id)
      }
    });
    req.session.flash = {
      success: 'Product deleted successfully'
    };
    req.session.save(() => {
      res.redirect('/admin/products');
    });
  }
}

module.exports = new ProductController();
