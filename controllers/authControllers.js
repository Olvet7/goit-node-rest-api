import jwt from "jsonwebtoken";

import User from "../models/user.js";

import { getRegistred, createRegistredUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await getRegistred(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const data = req.body;
  const newUser = await createRegistredUser(data);

  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {

  const { email, password, id } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    throw HttpError(401, "Validation error from Joi or other validation library");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Validation error from Joi or other validation library");
  }

  const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

  const payload = { id: user._id };

  console.log(process.env.SECRET_JWT_KEY);

  const token = jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: "23h" });
  console.log(token);

  const decodeToken = jwt.decode(token);
  console.log(decodeToken);

  res.json({
    token,
  });
  //
  try {
    const { id } = jwt.verify(token, SECRET_JWT_KEY);
    console.log(id);
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};

//

// {
//     "name": "olha1234567",
//     "email": "olha8@gmail.com",
//     "password": "1234567"
// }
