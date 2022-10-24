const validator = schema => {
  return async (req, res, next) => {
    try {
      const validation = await schema.validateAsync(req);
      return next(validation.error);
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = {
  validator,
};
