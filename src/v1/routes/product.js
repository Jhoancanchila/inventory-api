import express from 'express';
import { createOneProduct, getAllProducts, getOneProduct, updateOneProduct, deleteOneProduct } from '../../controllers/productController.js';

export default function productRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router
    .get('/products', ( req, res ) => getAllProducts( req, res ))

    .get('/products/:id', ( req, res ) => getOneProduct( req, res ))  

    .post('/products', ( req, res ) => createOneProduct( req, res ))  

    .put('/products/:id', ( req, res ) => updateOneProduct( req, res ))  

    .delete('/products/:id', ( req, res ) => deleteOneProduct( req, res ));  

  return router;
};