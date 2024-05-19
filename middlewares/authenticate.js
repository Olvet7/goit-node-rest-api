import HttpError from "../helpers/HttpError.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const { SECRET_JWT_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header not found"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_JWT_KEY);
    const user = await authServices.findUser({ _id: id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }

    if (!user.token) {
      req.user = user;
      return next(HttpError(401, "Token is wrong"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, error.message));
  }
};

export default authenticate;
