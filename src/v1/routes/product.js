import express from 'express';
import { createOneProduct, getAllProducts, getOneProduct, updateOneProduct, deleteOneProduct } from '../../controllers/productController.js';
import { authenticateToken } from '../../auth/middleware/auth.js';
import { authorizeRole } from '../../auth/middleware/authorize.js';

export default function productRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router
    .get('/products', authenticateToken, authorizeRole('admin'), ( req, res ) => getAllProducts( req, res ))

    .get('/products/:id', authenticateToken, authorizeRole('admin'), ( req, res ) => getOneProduct( req, res ))  

    .post('/products', authenticateToken, authorizeRole('admin'), ( req, res ) => createOneProduct( req, res ))  

    .put('/products/:id', authenticateToken, authorizeRole('admin'), ( req, res ) => updateOneProduct( req, res ))  

    .delete('/products/:id', authenticateToken, authorizeRole('admin'), ( req, res ) => deleteOneProduct( req, res ));  

  return router;
};