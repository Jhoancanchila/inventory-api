import { User } from "../db/models/user.js";

export const getUser = async ( param ) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  await User.sync();
  const user = await User.findOne({
    
    where: !emailRegex.test( param ) ? {
      id: param
    } : {
      email: param
    }
  });
  return user;
};

export const createUser = async ( { name, email, password, role } ) => {
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  return user;
}