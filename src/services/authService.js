import { User } from "../db/models/user.js";

export const getUser = async ( key ) => {
  await User.sync();
  const user = await User.findOne({
    
    where: typeof key === 'number' ? {
      id: key
    } : {
      email: key
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