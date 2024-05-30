import User from "../models/user.js";
import bcrypt from "bcrypt";

export const findUser = (filter) => User.findOne(filter);

export const createRegistredUser = async ({ email, name, password, verificationToken, avatarURL}) => {
  const createHashPassword = await bcrypt.hash(password, 10);
  return User.create({ email, name, verificationToken, avatarURL, password: createHashPassword});
};

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const updateSubscription = (filter, data) => User.findByIdAndUpdate(filter, data);
