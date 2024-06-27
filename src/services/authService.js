import { User } from "../db/models/user.js";

export const getUser = async ( email ) => {
  await User.sync();
  const user = await User.findOne({
    where: {
      email: email,
    },
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