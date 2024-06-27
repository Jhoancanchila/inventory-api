import passport from "../auth/strategies/local.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUser, createUser } from "../services/authService.js";
import config from "../config/config.js";

export const createOneUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {   
    const userExisted = await getUser(email);
    if(userExisted) {
      return res.status(400).json({ message: "User already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, password: hashedPassword, role });

    return res.status(201).json({ message: "User registed successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const validateUser = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(400).json({ message: info.message });

      const token = jwt.sign({ id: user.id, role: user.role }, config.authJwtSecret, { expiresIn: '1h' });

      //Se elimina la contraseña del objeto user
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
      res.status(200).json({ user: userWithoutPassword, token });
  })(req, res, next);
    
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });   
  }
};