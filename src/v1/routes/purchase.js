import express from 'express';
import { createOnePurchase, getAllPurchases, getPurchasesByClient, getPurchasesById } from '../../controllers/purchaseController.js';
import { authenticateToken } from '../../auth/middleware/auth.js';
import { authorizeRole } from '../../auth/middleware/authorize.js';
import { validateIdParams } from '../../auth/middleware/validateIdParams.js';

export default function purchaseRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router

    /**
       * @api {get} /purchases Get all purchases
       * @apiName GetAllPurchases
       * @apiDescription Get all purchases
       * @apiGroup Purchase
       * @apiVersion 1.0.0
       * @apiPermission admin
       * @apiHeader {String} Authorization Bearer token.
       *
       * @apiSuccess {Boolean} status Request status.
       * @apiSuccess {Number} statusCode HTTP status code.
       * @apiSuccess {String} message Descriptive message.
       * @apiSuccess {Object[]} data List of purchases.
      
       * @apiError (500) InternalServerError Error getting
    */
    .get('/purchases', authenticateToken, authorizeRole('admin'), ( req, res ) => getAllPurchases( req, res ))

    /**
       * @api {get} /:clientId/purchases Get purchases by client ID
       * @apiName GetPurchasesByClient
       * @apiGroup Purchase
       * @apiDescription Get purchases by client
       * @apiVersion 1.0.0
       * @apiHeader {String} Authorization Bearer token.
       * @apiPermission client
       *
       * @apiParam {Number} clientId Unique ID of the client.
       *
       * @apiSuccess {Boolean} status Request status.
       * @apiSuccess {Number} statusCode HTTP status code.
       * @apiSuccess {String} message Descriptive message.
       * @apiSuccess {Object[]} data List of purchases.
       *
       * @apiError (500) InternalServerError Error getting purchases.
    */
    .get('/purchases/client/:id', validateIdParams, authenticateToken, authorizeRole('client'), ( req, res ) => getPurchasesByClient( req, res))

    /**
       * @api {get} /purchases/:id Get purchase by ID
       * @apiName GetPurchaseById
       * @apiDescription Get purchase by ID
       * @apiGroup Purchase
       * @apiVersion 1.0.0
       * @apiHeader {String} Authorization Bearer token.
       * @apiPermission client
       *
       * @apiParam {Number} id Unique ID of the purchase.
       *
       * @apiSuccess {Boolean} status Request status.
       * @apiSuccess {Number} statusCode HTTP status code.
       * @apiSuccess {String} message Descriptive message.
       * @apiSuccess {Object} data Purchase data.
       *
       * @apiError (404) PurchaseNotFound Purchase not found.
       * @apiError (500) InternalServerError Error getting purchase.
    */

    .get('/purchases/:id', validateIdParams, authenticateToken, authorizeRole('client'), ( req, res ) => getPurchasesById( req, res))

    /**
       * @api {post} /purchases Create a new purchase
       * @apiName CreateOnePurchase
       * @apiDescription Create a new purchase
       * @apiGroup Purchase
       * @apiVersion 1.0.0
       * @apiHeader {String} Authorization Bearer token.
       * @apiHeader {String} Content-Type application/json.
       * @apiPermission client
       *
       * @apiParam {Number} clientId* ID of the client making the purchase (required).
       * @apiParam {Object[]} products* List of products in the purchase (required).
       * @apiParam {Number} products.productId* ID of the product (required).
       * @apiParam {Number} products.quantity* Quantity of the product (required).
       * @apiParamExample {json} Request-Example:
       * {
            "clientId": 3,
            "products": [
                { "productId": 1, "quantity": 2 },
                { "productId": 3, "quantity": 2 }
            ]
          }
       
       * @apiSuccess {Boolean} status Request status.
       * @apiSuccess {Number} statusCode HTTP status code.
       * @apiSuccess {String} message Descriptive message.
       * @apiSuccess {Object} data Data of the created purchase.
       *
       * @apiError (404) AccessDenied Access denied: You do not have the appropriate role.
       * @apiError (404) ProductNotFound Product not found.
       * @apiError (500) InternalServerError Error creating purchase.
    */
    .post('/purchases', authenticateToken, authorizeRole('client'), ( req, res ) => createOnePurchase( req, res))

  return router;
};