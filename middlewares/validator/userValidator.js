const Joi = require('joi');
const CustomError = require('../customError');

const postSignUpValidate = Joi.object({
  body: Joi.object({
    firstName: Joi.string().required().error(new CustomError(404, 'Invalid_fistName')),
    lastName: Joi.string().required().error(new CustomError(404, 'Invalid_lastName')),
    nickName: Joi.string().required().error(new CustomError(404, 'Invalid_nickName')),
    email: Joi.string()
      .email({ tlds: true })
      .required()
      .error(new CustomError(404, 'Invalid_email')),
    address: Joi.string().required().error(new CustomError(404, 'Invalid_address')),
    password: Joi.string().min(4).required().error(new CustomError(404, 'Invalid_password')),
  }),
}).unknown(true);

const postLoginValidate = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: true })
      .required()
      .error(new CustomError(404, 'Invalid_email')),
    password: Joi.string().min(4).required().error(new CustomError(404, 'Invalid_password')),
  }),
}).unknown(true);

module.exports = {
  postSignUpValidate,
  postLoginValidate,
};
