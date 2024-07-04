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
       * @apiSuccessExample {json} Success-Response:
       * {
       *  "status": true,
       *  "statusCode": 200,
       *  "message": "Purchases found",
       *  "data": [
       *     {
       *        "id": "40170d04-dba1-4d17-be0c-ad31c8a4d08e",
       *        "clientId": "a37833b6-fcb4-4b27-989b-9629dbb4ca33",
       *        "date_created": "2024-07-02T18:27:42.000Z",
       *        "total": "600.00",
       *        "createdAt": "2024-07-02T18:27:42.000Z",
       *        "updatedAt": "2024-07-02T18:27:42.000Z",
       *        "products": [
       *        {
       *           "id": "c117a006-c31a-49e4-b111-d23d21cea9b7",
       *           "lot_number": 66666,
       *           "product_name": "PERAS",
       *           "price": "100.00",
       *           "available_quantity": 10,
       *           "date_entry": "2024-07-02T18:23:26.000Z",
       *           "createdAt": "2024-07-02T18:23:26.000Z",
       *           "updatedAt": "2024-07-02T18:23:26.000Z",
       *           "PurchaseProduct": {
       *              "quantity": 2
       *           }
       *        },
       *        {
       *           "id": "7ab9f9c1-855b-4b32-b109-a4c3d7ab5fa7",
       *           "lot_number": 67996,
       *           "product_name": "UVAS",
       *           "price": "200.00",
       *           "available_quantity": 5,
       *           "date_entry": "2024-07-02T18:23:05.000Z",
       *           "createdAt": "2024-07-02T18:23:05.000Z",
       *           "updatedAt": "2024-07-02T18:23:05.000Z",
       *           "PurchaseProduct": {
       *              "quantity": 2
       *           }
       *        }
       *        ]
       *     }
       *  ]
       *  }
       * @apiError (401) Unauthorized.
       * @apiErrorExample {json} Error-Response:
       * {
       *   "status": false,
       *   "statusCode": 401,
       *   "message": "Unauthorized"
       * }
       * @apiError (403) forbidden.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 403,
       *  "message": "Forbidden: client id does not match user authenticated id",
       * }
       * @apiError (404) PurchaseNotFound Purchase not found.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 404,
       *  "message": "Purchases not found"
       * }
       * @apiError (500) InternalServerError Error getting
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 500,
       *  "message": "Error getting purchases"
       * }
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
       * @apiSuccessExample {json} Success-Response:
       * {
       *  "status": true,
       *  "statusCode": 200,
       *  "message": "Purchases found",
       *  "data": [
       *     {
       *        "id": "40170d04-dba1-4d17-be0c-ad31c8a4d08e",
       *        "clientId": "a37833b6-fcb4-4b27-989b-9629dbb4ca33",
       *        "date_created": "2024-07-02T18:27:42.000Z",
       *        "total": "600.00",
       *        "createdAt": "2024-07-02T18:27:42.000Z",
       *        "updatedAt": "2024-07-02T18:27:42.000Z",
       *        "products": [
       *        {
       *           "id": "c117a006-c31a-49e4-b111-d23d21cea9b7",
       *           "lot_number": 66666,
       *           "product_name": "PERAS",
       *           "price": "100.00",
       *           "available_quantity": 10,
       *           "date_entry": "2024-07-02T18:23:26.000Z",
       *           "createdAt": "2024-07-02T18:23:26.000Z",
       *           "updatedAt": "2024-07-02T18:23:26.000Z",
       *           "PurchaseProduct": {
       *              "quantity": 2
       *           }
       *        },
       *        {
       *           "id": "7ab9f9c1-855b-4b32-b109-a4c3d7ab5fa7",
       *           "lot_number": 67996,
       *           "product_name": "UVAS",
       *           "price": "200.00",
       *           "available_quantity": 5,
       *           "date_entry": "2024-07-02T18:23:05.000Z",
       *           "createdAt": "2024-07-02T18:23:05.000Z",
       *           "updatedAt": "2024-07-02T18:23:05.000Z",
       *           "PurchaseProduct": {
       *              "quantity": 2
       *           }
       *        }
       *        ]
       *     }
       *  ]
       *  }
       * @apierror (401) Unauthorized.
       * @apiErrorExample {json} Error-Response:
       * {
       *   "status": false,
       *   "statusCode": 401,
       *   "message": "Unauthorized"
       * }
       * @apiError (403) forbidden.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 403,
       *  "message": "Access denied: You do not have the appropriate role.",
       * }
       * @apiError (404) PurchaseNotFound Purchase not found.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 404,
       *  "message": "Purchase not found"
       * }
       * @apiError (500) InternalServerError Error getting purchases.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 500,
       *  "message": "Error getting purchases"
       * }
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
       * @apiSuccessExample {json} Success-Response:
       * {
       *  "status": true,
       *  "statusCode": 200,
       *  "message": "Purchase found",
       *  "data": {
       *     "id": "4d7c60b6-39d1-49ee-8d5a-e705cee1320f",
       *     "date_created": "2024-07-02T14:20:37.000Z",
       *     "total": "1400.00",
       *     "createdAt": "2024-07-02T14:20:37.000Z",
       *     "updatedAt": "2024-07-02T14:20:37.000Z",
       *     "client": {
       *        "id": "90e640ad-19db-45c2-bab7-be3a92999ee3",
       *        "name": "Ana Combita",
       *        "email": "ana@gmail.com"
       *     },
       *     "products": [
       *        {
       *        "id": "65d62df4-5a9b-47d7-8e73-28e430a0e557",
       *        "lot_number": 67996,
       *        "product_name": "UVAS",
       *        "price": "200.00",
       *        "available_quantity": 5,
       *        "date_entry": "2024-07-02T14:13:02.000Z",
       *        "createdAt": "2024-07-02T14:13:02.000Z",
       *        "updatedAt": "2024-07-02T14:13:02.000Z",
       *        "PurchaseProduct": {
       *           "quantity": 2
       *        }
       *        },
       *        {
       *        "id": "c15741c5-49ec-4ede-93e4-f95c4aae1a1f",
       *        "lot_number": 676,
       *        "product_name": "MANZANAS",
       *        "price": "500.00",
       *        "available_quantity": 10,
       *        "date_entry": "2024-07-02T14:08:27.000Z",
       *        "createdAt": "2024-07-02T14:08:27.000Z",
       *        "updatedAt": "2024-07-02T14:08:27.000Z",
       *        "PurchaseProduct": {
       *           "quantity": 2
       *        }
       *        }
       *     ]
       *  }
       *  }
       * @apiError (400) Invalid id format.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 400,
       *  "message": "Invalid id format",
       *  "error": [
       *     {
       *        "validation": "uuid",
       *        "code": "invalid_string",
       *        "message": "Invalid uuid",
       *        "path": []
       *     }
       *  ]
       *  }
       * @apiError (401) Unauthorized.
       * @apiErrorExample {json} Error-Response:
       * {
       *    "status": false,
       *    "statusCode": 401,
       *    "message": "Unauthorized"
       * }
       * @apiError (403) forbidden.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 403,
       *  "message": "forbidden",
       * }
       * @apiError (404) PurchaseNotFound Purchase not found.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 404,
       *  "message": "Purchase not found"
       * }
       * @apiError (500) InternalServerError Error getting purchase.
       * @apiErrorExample {json} Error-Response:
       * {
       *   "status": false,
       *   "statusCode": 500,
       *   "message": "Error getting purchase"
       * }
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
       * @apiSuccessExample {json} Success-Response:
       * {
       *  "status": true,
       *  "statusCode": 201,
       *  "message": "Purchase created",
       *  "data": {
       *     "id": "4d7c60b6-39d1-49ee-8d5a-e705cee1320f",
       *     "date_created": "2024-07-02T14:20:37.000Z",
       *     "total": "1400.00",
       *     "createdAt": "2024-07-02T14:20:37.000Z",
       *     "updatedAt": "2024-07-02T14:20:37.000Z",
       *     "client": {
       *        "id": "90e640ad-19db-45c2-bab7-be3a92999ee3",
       *        "name": "Ana Combita",
       *        "email": "ana@gmail.com"
       *     },
       *     "products": [
       *        {
       *        "id": "65d62df4-5a9b-47d7-8e73-28e430a0e557",
       *        "lot_number": 67996,
       *        "product_name": "UVAS",
       *        "price": "200.00",
       *        "available_quantity": 5,
       *        "date_entry": "2024-07-02T14:13:02.000Z",
       *        "createdAt": "2024-07-02T14:13:02.000Z",
       *        "updatedAt": "2024-07-02T14:13:02.000Z",
       *        "PurchaseProduct": {
       *           "quantity": 2
       *        }
       *        },
       *        {
       *        "id": "c15741c5-49ec-4ede-93e4-f95c4aae1a1f",
       *        "lot_number": 676,
       *        "product_name": "MANZANAS",
       *        "price": "500.00",
       *        "available_quantity": 10,
       *        "date_entry": "2024-07-02T14:08:27.000Z",
       *        "createdAt": "2024-07-02T14:08:27.000Z",
       *        "updatedAt": "2024-07-02T14:08:27.000Z",
       *        "PurchaseProduct": {
       *           "quantity": 2
       *        }
       *        }
       *     ]
       *  }
       *  }
       * @apiError (400) BadRequest Invalid request body.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 400,
       *  "message": "Invalid data",
       *  "error": [
       *     {
       *        "code": "invalid_type",
       *        "expected": "string",
       *        "received": "number",
       *        "path": [
       *        "products",
       *        0,
       *        "productId"
       *        ],
       *        "message": "Expected string, received number"
       *     },
       *     {
       *        "code": "invalid_type",
       *        "expected": "string",
       *        "received": "number",
       *        "path": [
       *        "products",
       *        1,
       *        "productId"
       *        ],
       *        "message": "Expected string, received number"
       *     }
       *  ]
       *  }
       * @apiError (401) unauthorized.
       * @apiErrorExample {json} Error-Response:
       * {
       *     "status": false,
       *     "statusCode": 401,
       *     "message": "Unauthorized"
       *   }
       * @apiError (403) Forbidden.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 403,
       *  "message": "Access denied: You do not have the appropriate role."
       *  }
       *
       * @apiError (500) InternalServerError Error creating purchase.
       * @apiErrorExample {json} Error-Response:
       * {
       *  "status": false,
       *  "statusCode": 500,
       *  "message": "Error creating purchase"
       * }
    */
    .post('/purchases', authenticateToken, authorizeRole('client'), ( req, res ) => createOnePurchase( req, res))

  return router;
};