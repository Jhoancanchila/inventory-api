import express from 'express';
import { createOneProduct, getAllProducts, getOneProduct, updateOneProduct, deleteOneProduct } from '../../controllers/productController.js';
import { authenticateToken } from '../../auth/middleware/auth.js';
import { authorizeRole } from '../../auth/middleware/authorize.js';
import { validateIdParams } from '../../auth/middleware/validateIdParams.js';

export default function productRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router
    /**
      * @api {get} /products get all products
      * @apiName GetAllProducts
      * @apiGroup Product
      * @apiVersion 1.0.0
      * @apiDescription get all products
      * @apiPermission admin
      * @apiHeader {String} Authorization Bearer token.
       
      * @apiSuccess {Boolean} status state of request.
      * @apiSuccess {Number} statusCode code of status HTTP.
      * @apiSuccess {String} message message descriptive.
      * @apiSuccess {Object[]} data list of products.
      * @apiSuccessExample {json} Success-Response:
      *     {
      *        "status": true,
      *        "statusCode": 200,
      *        "message": "All products",
      *        "data": [
      *          {
      *            "id": 1,
      *            "lot_number": 5555,
      *            "product_name": "Papaya",
      *            "price": "100.00",
      *            "available_quantity": 20,
      *            "date_entry": "2024-06-28T04:35:45.000Z",
      *            "createdAt": "2024-06-28T04:35:45.000Z",
      *            "updatedAt": "2024-06-28T04:35:45.000Z"
      *          },
      *          {
      *            "id": 2,
      *            "lot_number": 4812,
      *            "product_name": "Ciruelas",
      *            "price": "50.00",
      *            "available_quantity": 10,
      *            "date_entry": "2024-06-28T04:41:10.000Z",
      *            "createdAt": "2024-06-28T04:41:10.000Z",
      *            "updatedAt": "2024-06-28T04:41:10.000Z"
      *          }
      *        ]
      *      }      
      *
      * @apiError (Error 401) Unauthorized.
      * @apiErrorExample {json} Error-Response:
      *     HTTP/1.1 401 Internal Server Error
      *     {
      *       "status": false,
      *       "statusCode": 401,
      *       "message": "Unauthorized",
      *     }
      * @apiError (Error 500) Error getting all products.
      * @apiErrorExample {json} Error-Response:
      *   {
      *      "status": false,
      *      "statusCode": 500,
      *      "message": "Error getting all products"
      *    }
    */
    .get('/products', authenticateToken, authorizeRole('admin'), ( req, res ) => getAllProducts( req, res ))

    /**
      * @api {get} /products/:id get one product
      * @apiName GetOneProduct
      * @apiGroup Product
      * @apiVersion 1.0.0
      * @apiPermission admin
      * @apiDescription get one product
      * @apiHeader {String} Authorization Bearer token.
      *
      * @apiParam {Number} id ID unique of product.
      *
      * @apiSuccess {Boolean} status state of request.
      * @apiSuccess {Number} statusCode code of status HTTP.
      * @apiSuccess {String} message message descriptive.
      * @apiSuccess {Object} data data of product.
      * @apiSuccessExample {json} Success-Response:
      *   {
      *      "status": true,
      *      "statusCode": 200,
      *      "message": "Product found",
      *      "data": {
      *        "id": 2,
      *        "lot_number": 4812,
      *        "product_name": "Ciruelas",
      *        "price": "50.00",
      *        "available_quantity": 10,
      *        "date_entry": "2024-06-28T04:41:10.000Z",
      *        "createdAt": "2024-06-28T04:41:10.000Z",
      *        "updatedAt": "2024-06-28T04:41:10.000Z"
      *      }
      *    }
      *
      * @apiError (Error 404) ProductNotFound product not found.
      * @apiErrorExample {json} Error-Response:
      *   {
      *    "status": false,
      *    "statusCode": 404,
      *    "message": "Product not found"
      *    }
      * @apiError (Error 500) Error getting product.
      * @apiErrorExample {json} Error-Response:
      *   {
      *      "status": false,
      *      "statusCode": 500,
      *      "message": "Error getting all products"
      *    }
    */
    .get('/products/:id', validateIdParams, authenticateToken, authorizeRole('admin'), ( req, res ) => getOneProduct( req, res ))
    
    /**
        * @api {post} /products create a new product
        * @apiName CreateOneProduct
        * @apiGroup Product
        * @apiVersion 1.0.0
        * @apiPermission admin
        * @apiDescription create a new product
        * @apiHeader {String} Authorization Bearer token.
        * @apiHeader {String} Content-Type application/json.
        *
        * @apiParam {number} lot_number lot number of product (required).
        * @apiParam {String} product_name name of product (required).
        * @apiParam {float} price price of product (required).
        * @apiParam {Number} available_quantity quantity of product (required).
        *
        * @apiSuccess {Boolean} status state of request.
        * @apiSuccess {Number} statusCode code of status HTTP.
        * @apiSuccess {String} message message descriptive.
        * @apiSuccess {Object} data data of product created.
        * @apiSuccessExample {json} Success-Response:
        *    {
        *       "status": true,
        *       "statusCode": 201,
        *       "message": "Created product",
        *       "data": {
        *         "date_entry": "2024-06-28T13:35:27.830Z",
        *         "id": 3,
        *         "lot_number": 676,
        *         "product_name": "MANZANAS",
        *         "price": 500,
        *         "available_quantity": 10,
        *         "updatedAt": "2024-06-28T13:35:27.831Z",
        *         "createdAt": "2024-06-28T13:35:27.831Z"
        *       }
        *     }
        *
        * @apiError (Error 400) InvalidData data invalidate.
        * @apiErrorExample {json} Error-Response:
        *    {
        *        "status": false,
        *        "statusCode": 400,
        *        "message": "Invalid data",
        *        "error": [
        *          {
        *            "code": "invalid_type",
        *            "expected": "number",
        *            "received": "undefined",
        *            "path": [
        *              "available_quantity"
        *            ],
        *            "message": "Required"
        *          }
        *        ]
        *      }
        * @apiError (Error 500) InternalServerError Error creating product.
        * @apiErrorExample {json} Error-Response:
        *    {
        *       "status": false,
        *       "statusCode": 500,
        *       "message": "Error creating product"
        *    }
    */

    .post('/products', authenticateToken, authorizeRole('admin'), ( req, res ) => createOneProduct( req, res ))
    
    /**
       * @api {put} /products/:id update a product
       * @apiName UpdateOneProduct
       * @apiGroup Product
       * @apiVersion 1.0.0
       * @apiPermission admin
       * @apiDescription update a product
       * @apiHeader {String} Authorization Bearer token.
       * @apiHeader {String} Content-Type application/json.
       *
       * @apiParam {Number} lot_number number of lot of product (required).
       * @apiParam {String} product_name name of product (required).
       * @apiParam {Number} price price of product (required).
       * @apiParam {Number} available_quantity quantity of product (required).
       *
       * @apiSuccess {Boolean} status state of request.
       * @apiSuccess {Number} statusCode code of status HTTP.
       * @apiSuccess {String} message message descriptive.
       * @apiSuccess {Object} data data of product updated.
       *
       * @apiError (Error 400) InvalidData data invalidate.
       * @apiErrorExample {json} Error-Response:
       *    {
       *       "status": false,
       *       "statusCode": 400,
       *       "message": "Invalid data",
       *       "error": [
       *         {
       *           "code": "invalid_type",
       *           "expected": "number",
       *           "received": "undefined",
       *           "path": [
       *             "available_quantity"
       *           ],
       *           "message": "Required"
       *         }
       *       ]
       *     }
       * @apiError (Error 404) ProductNotFound product not found.
       * @apiErrorExample {json} Error-Response:
       *   {
       *     "status": false,
       *     "statusCode": 404,
       *     "message": "Product not found"
       *   }
       * @apiError (Error 500) InternalServerError error updating product.
       * @apiErrorExample {json} Error-Response:
       *    {
       *      "status": false,
       *      "statusCode": 500,
       *      "message": "Error updating product"
       *    }
      */

    .put('/products/:id', validateIdParams, authenticateToken, authorizeRole('admin'), ( req, res ) => updateOneProduct( req, res )) 
    
    /**
       * @api {delete} /products/:id delete a product
       * @apiName DeleteOneProduct
       * @apiGroup Product
       * @apiVersion 1.0.0
       * @apiPermission admin
       * @apiDescription delete a product
       * @apiHeader {String} Authorization Bearer token.
       *
       * @apiParam {Number} id ID unique of product.
       *
       * @apiSuccess {Boolean} status state of request.
       * @apiSuccess {Number} statusCode code of status HTTP.
       * @apiSuccess {String} message message descriptive.
       * @apiSuccessExample {json} Success-Response:
       *   {
       *      "status": true,
       *      "statusCode": 202,
       *      "message": "Product deleted"
       *   }
       *
       * @apiError (Error 404) ProductNotFound product not found.
       * @apiErrorExample {json} Error-Response:
       *  {
       *     "status": false,
       *     "statusCode": 404,
       *     "message": "Product not found"
       *   }
       * @apiError (Error 500) InternalServerError error deleting product.
       * @apiErrorExample {json} Error-Response:
       *  {
       *     "status": false,
       *     "statusCode": 500,
       *     "message": "Error updating product"
       *   }
      */

    .delete('/products/:id', validateIdParams, authenticateToken, authorizeRole('admin'), ( req, res ) => deleteOneProduct( req, res ));  

  return router;
};