import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import bcrypt from "bcrypt";

const { SECRET_JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });
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
  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: "23h" });

  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });

  try {
    const { id } = jwt.verify(token, SECRET_JWT_KEY);
  } catch (error) {}
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.status(204).send();
};

const updateSubscription = async (req, res) => {
  const {_id, subscription} = req.body;
  await authServices.updateSubscription(_id, {subscription});
  res.status(200).json({
    message: `New subscription ${subscription}`,
  })
}

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
