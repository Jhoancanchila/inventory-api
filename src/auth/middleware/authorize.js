//Middleware de Verificación de Rol
export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role && role) {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Forbidden: Access denied: You do not have the appropriate role."
      });
    }
    next();
  };
}