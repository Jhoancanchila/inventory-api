import express from 'express';

import { createOneUser, validateUser } from '../../controllers/authController.js';

export default function auth( app ) {
  const router = express.Router();
  app.use('/api/v1/auth', router);

  router
    .post("/login", (req,res) => validateUser( req, res))

    .post("/register", (req,res) => createOneUser( req, res))

}

