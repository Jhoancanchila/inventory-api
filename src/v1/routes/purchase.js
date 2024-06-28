import express from 'express';
import { createOnePurchase, getAllPurchases, getPurchasesByClient, getPurchasesById } from '../../controllers/purchaseController.js';
import { authenticateToken } from '../../auth/middleware/auth.js';
import { authorizeRole } from '../../auth/middleware/authorize.js';

export default function purchaseRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router
    .get('/purchases', authenticateToken, authorizeRole('admin'), ( req, res ) => getAllPurchases( req, res ))
    .get('/purchases/client/:clientId',  authenticateToken, authorizeRole('client'), ( req, res ) => getPurchasesByClient( req, res))
    .get('/purchases/:id',  authenticateToken, authorizeRole('client'), ( req, res ) => getPurchasesById( req, res))
    .post('/purchases', authenticateToken, authorizeRole('client'), ( req, res ) => createOnePurchase( req, res))

  return router;
};