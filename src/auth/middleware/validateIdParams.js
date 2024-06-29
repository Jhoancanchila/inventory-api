import z from 'zod';

// Esquema de validación con Zod para UUID
const idSchema = z.string().uuid();

export const validateIdParams = (req, res, next) => {
  const { id } = req.params; 

  // Validar el ID usando el esquema de Zod
  const result = idSchema.safeParse(id);

  if (!result.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Invalid id format',
      error: JSON.parse(result.error.message),
    });
  }

  // Si el ID es válido, pasar al siguiente middleware o controlador
  next();
};
