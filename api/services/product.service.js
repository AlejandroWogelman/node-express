import { faker } from '@faker-js/faker';
import { conflict, notFound } from '@hapi/boom';

//lOGICA E INTERACCIONES A NIVEL TRANSACCIONAL
//SE DEBE ENCARGAR DE CREAR, EDITAR, ELIMINAR, ETC
class Product {
  constructor({ name, price, image }) {
    (this.id = faker.datatype.uuid()),
      (this.name = name),
      (this.price = price),
      (this.image = image);
    this.isBlock = faker.datatype.boolean();
  }

  updatePr({ name = this.name, price = this.price, image = this.image }) {
    this.image = image;
    this.price = price;
    this.name = name;
  }
}

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      const newProduct = new Product({
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
      this.products.push(newProduct);
    }
  }
  async create({ name, image, price }) {
    /* image-name-price */

    const newProduct = new Product({
      image,
      price,
      name,
    });
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1200);
    });
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw notFound('Product not found');
    }
    if (product.isBlock) {
      throw conflict('Product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((x) => x.id === id);
    if (index === -1) {
      throw notFound('Product not found');
    }

    this.products[index].updatePr(changes);
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((x) => x.id === id);
    if (index === -1) {
      throw notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductsService;
