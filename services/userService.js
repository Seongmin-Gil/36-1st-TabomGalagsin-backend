const userDao = require('../models/userDao');

const bcrypt = require('bcrypt');
const saltRounds = 8;

const jwt = require('jsonwebtoken');
const CustomError = require('../middlewares/customError');

const signUp = async (firstName, lastName, nickName, email, address, password) => {
  const emailCheck = await userDao.selectEmail(email);
  if (emailCheck === '1') throw new CustomError(400, 'duplicate Email');

  const bcryptPassword = await bcrypt.hash(password, saltRounds);
  const createUser = await userDao.insertUser(
    firstName,
    lastName,
    nickName,
    email,
    address,
    bcryptPassword
  );
  return createUser;
};

const login = async (email, password) => {
  const emailCheck = await userDao.selectEmail(email);

  if (!emailCheck) throw new CustomError(400, 'Invalid_email');

  const databasePassword = await userDao.selectPassword(email);
  const verifiedPassword = await bcrypt.compare(password, databasePassword);

  if (!verifiedPassword) throw new CustomError(400, 'Invalid_password');

  const userId = await userDao.selectUserId(email);

  const secretKey = process.env.SECRETKEY;
  const accessTtl = process.env.ACCESS_TOKEN_TTL;

  const accessPayLoad = {
    exp: Math.floor(Date.now() / 1000) + Number(accessTtl),
    scope: 'access',
    id: userId,
    email,
  };

  return jwt.sign(accessPayLoad, secretKey);
};

module.exports = {
  signUp,
  login,
};
