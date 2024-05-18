import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import bcrypt from "bcrypt";

const {SECRET_JWT_KEY} = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({email});
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authServices.createRegistredUser(req.body);
  if (!newUser) {
    throw HttpError(404, "Not found");
}

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {

  const { email, password } = req.body;
  const user = await authServices.getRegistred(email);
  
  if (!user) {
    throw HttpError(401, "Email or password is wrong")};
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong")};

    const {_id: id} = user;
    const payload = {
      id,
    }
  const token = jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: "23h" });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
  });

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
