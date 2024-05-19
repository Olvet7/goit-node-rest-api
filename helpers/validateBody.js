import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const bodyKeys = Object.keys(req.body).length;
    const { error } = schema.validate(req.body);
    if(!bodyKeys) {
      next(HttpError(400, "Missed required email field"))
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;