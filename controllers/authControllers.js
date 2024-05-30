import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import sendMail from "../mail.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import gravatar from "gravatar";

const { SECRET_JWT_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const newUser = await authServices.createRegistredUser({
    email,
    password,
    verificationToken,
    avatarURL,
  });
  if (!newUser) {
    throw HttpError(404, "Not found");
  }

  const verifyEmail = {
    to: email,
    subject: "Welcome to Contacts App!",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify email</a>`,
    text: `Click here to verify email: ${BASE_URL}/api/users/verify/${verificationToken}`,
  };

  await sendMail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await authServices.findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  };

  await authServices.updateUser(
    { _id: user._id },
    { verify: true },
    { verificationToken: null }
  );

  res.json({
    message: "Verification successful",
  });
};

const resendVerify = async(req, res) => {
  const {email} = req.body;
  const user = await authServices.findUser({email});
  if(!user){
    throw HttpError(404, "missing required field email");
  };

  if (user.verify){
    throw HttpError(400, "Verification has already been passed");
  };

  const verifyEmail = {
    to: email,
    subject: "Welcome to Contacts App!",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify email</a>`,
    text: `Click here to verify email: ${BASE_URL}/api/users/verify/${user.verificationToken}`,
  };

  await sendMail(verifyEmail);

  res.send({
    message: "Verification email sent",
  }) 
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    return HttpError(401, "Please confirm verification on email");
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
  const { _id, subscription } = req.body;
  await authServices.updateSubscription(_id, { subscription });
  res.status(200).json({
    message: `New subscription ${subscription}`,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
};
