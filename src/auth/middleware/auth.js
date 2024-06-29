import jwt from "jsonwebtoken";
import config from "../../config/config.js";

//Validación del token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({
    status: false,
    statusCode: 401,
    message: "Unauthorized"
  });

  try {
    jwt.verify(token, config.authJwtSecret, (err, user) => {
      if (err) return res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Forbidden"
      });
      req.user = user;
      next();
    });   
  } catch (error) {
    res.status(403).json({
      status: false,
      statusCode: 403,
      message: "Forbidden"
    });
  }
};