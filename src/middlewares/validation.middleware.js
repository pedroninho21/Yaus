const Validation = (schema, key) => (req, res, next) => {
  if (!req[key]) {
    return res.status(400).json({ error: `missing ${key} in request object.` });
  }

  const { error } = schema.validate(req[key]);
  if (error) {
    return res
      .status(400)
      .json({ error: `${error.details[0].message} in req.${key}` });
  }

  next();
};

export default Validation;
