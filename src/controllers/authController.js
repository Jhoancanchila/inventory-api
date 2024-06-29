import passport from "../auth/strategies/local.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUser, createUser } from "../services/authService.js";
import config from "../config/config.js";
import { validateRegister } from "../utils/schemas/auth.js";

export const createOneUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const dataRegisterValidate = validateRegister({ name, email, password, role });
    if(dataRegisterValidate.error) return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Invalid data",
      error: JSON.parse(dataRegisterValidate.error.message)
    });
    const userExisted = await getUser(email);
    if(userExisted) {
      return res.status(400).json({ 
        status: false,
        statusCode: 400,
        message: "User already existed"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, password: hashedPassword, role });

    if(!user) {
      return res.status(500).json({ 
        status: false,
        statusCode: 500,
        message: "Internal server error"
      });
    }
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "User registed successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error"
    });
  }
};

export const validateUser = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(400).json({
        status: false,
        statusCode: 400,
        message: info.message
      });

      const token = jwt.sign({ id: user.id, role: user.role }, config.authJwtSecret, { expiresIn: '1h' });

      //Se elimina la contraseña del objeto user
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
      res.status(200).json({ user: userWithoutPassword, token });
  })(req, res, next);
    
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error"
    });   
  }
};