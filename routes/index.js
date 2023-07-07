import express from 'express';

import productsRouter from './products.router.js';
import usersRouter from './users.router.js';
import categoriesRouter from './categories.router.js';

function routerApi(app) {
  const router = express.Router(); //De esta forma actualizamos la base URL fácilmente sin estar cambiando de una en una.

  app.use('/api/v1', router); //versionado de api

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}

export default routerApi;
