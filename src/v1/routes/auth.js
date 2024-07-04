import express from 'express';

import { createOneUser, validateUser } from '../../controllers/authController.js';

export default function auth( app ) {
  const router = express.Router();
  app.use('/api/v1', router);

  router

    /**
     * @api {post} /login Validate user credentials
     * @apiName ValidateUser
     * @apiDescription Validate user credentials
     * @apiGroup Auth
     * @apiVersion 1.0.0
     * @apiHeader {String} Content-Type application
     * @apiPermission none
     *
     * @apiParam {String} email* Email of the user.
     * @apiParam {String} password* Password of the user.
     * @apiParamExample {json} Request-Example:
     * {
     *   "email": "<EMAIL>",
     *   "password": "<PASSWORD>"
     * }
     *
     * @apiSuccess {Object} user User object without password (required).
     * @apiSuccess {String} token JWT token for authentication (required).
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "user": {
     *       "id": 3,
     *       "name": "Josefina Contreras",
     *       "email": "josefina@gmail.com",
     *       "role": "client",
     *       "createdAt": "2024-06-28T04:38:26.000Z",
     *       "updatedAt": "2024-06-28T04:38:26.000Z"
     *     },
     *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImNsaWVudCIsImlhdCI6MTcxOTU4NjU0OCwiZXhwIjoxNzE5NTkwMTQ4fQ.1wqpxt-Lv6iIzBq98gv-KBhqiTRN8zmjqo7uew6m4rI"
     *   }
     *
     * @apiError (400) Bad request.
     * @apiErrorExample {json} Error-Response:
     *  {
     *     "status": false,
     *     "statusCode": 400,
     *     "message": "User or password incorrect"
     *   }
     * @apiError (500) InternalServerError Internal server error.
     * @apiErrorExample {json} Error-Response:
     *  {
     *     "status": false,
     *     "statusCode": 500,
     *     "message": "Internal server error"
     *   }
    */

    .post("/login", (req,res) => validateUser( req, res))

    /**
     * @api {post} /register Create a new user
     * @apiName CreateOneUser
     * @apiDescription Create a new user
     * @apiGroup Auth
     * @apiVersion 1.0.0
     * @apiHeader {String} Content-Type application
     * @apiPermission none
     *
     * @apiParam {String} name* Name of the user (required).
     * @apiParam {String} email* Email of the user (required).
     * @apiParam {String} password* Password of the user (required).
     * @apiParam {String} role* Role of the user for default is client.
     * @apiParamExample {json} Request-Example:
     * {
     *   "name": "John",
     *   "email": "<EMAIL>",
     *   "password": "<PASSWORD>",
     *   "role": "client"
     * }
     *
     * @apiSuccess {Boolean} status Request status.
     * @apiSuccess {Number} statusCode HTTP status code.
     * @apiSuccess {String} message Descriptive message.
     * @apiSuccessExample {json} Success-Response:
     *  {
     *    "status": true,
     *    "statusCode": 201,
     *    "message": "User created successfully"
     *  }
     *
     * @apiError (400) Bad Request.
     * @apiErrorExample {json} Error-Response:
     *  {
     *    "status": false,
     *     "statusCode": 400,
     *     "message": "Invalid data",
     *     "error": [
     *       {
     *         "validation": "email",
     *         "code": "invalid_string",
     *         "message": "Please provide a valid email *address",
     *         "path": [
     *           "email"
     *         ]
     *       }
     *     ]
     *  }
     *
     * @apiError (400) Bad Request.
     * @apiErrorExample {json} Error-Response:
     *  {
     *    "status": false,
     *    "statusCode": 400,
     *    "message": "User already existed"
     *  }
     *
     * @apiError (500) InternalServerError Internal server error.
     * @apiErrorExample {json} Error-Response:
     *  {
     *    "status": false,
     *    "statusCode": 500,
     *    "message": "Internal server error"
     *  }
    */

    .post("/register", (req,res) => createOneUser( req, res))

}

