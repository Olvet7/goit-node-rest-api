import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getRegistred = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const createRegistredUser = async ({email, name, password}) => {
  const createHashPassword = await bcrypt.hash(password, 10);
  return User.create({
    name,
    email,
    password: createHashPassword,
  });
};
