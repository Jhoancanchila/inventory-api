import express from 'express';
import { createOnePurchase, getAllPurchases, getPurchasesByClient } from '../../controllers/purchaseController.js';

export default function purchaseRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router
    .get('/purchases', ( req, res ) => getAllPurchases( req, res ))
    .get('/purchases/:clientId', ( req, res ) => getPurchasesByClient( req, res))
    .post('/purchases', ( req, res ) => createOnePurchase( req, res))

  return router;
};