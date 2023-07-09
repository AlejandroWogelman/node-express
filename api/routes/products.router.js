import express from 'express';
import ProductsService from '../services/product.service.js';
import validatorHandler from '../middleware/validator.handler.js';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schemas/product.schema.js';

//ROUTING SE ENCARGA DEL ACCESO.

const router = express.Router();
const service = new ProductsService();

//uso de querys
router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});
/*
router.get('/query', (req, res) => {
  const { name, data } = req.query;
  console.log(data, name);
  res.json({ name, data });
}); */

// /filter => lo toma como parametro
router.get('/filter', (req, res) => {
  res.send('soy un filter');
});

//PRIMERO VA EL PARAMETRO ESTATICO, LUEGO EL DINAMICO

//  /:ID => parametro dinamico
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//POST
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newProduct,
      });
    } catch (error) {
      res.json(error);
    }
  }
);

//PATCH
//Actualizacion flexible
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const update = await service.update(id, body);
      return res.json({
        message: 'update',
        data: update,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE
router.delete(
  '/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const deleted = await service.delete(id);

    res.json({
      message: 'deleted',
      deleted,
    });
  }
);

export default router;
