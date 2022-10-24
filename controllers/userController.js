const userService = require('../services/userService');

const postSignUp = async (req, res) => {
  const { firstName, lastName, nickName, email, address, password } = req.body;
  await userService.signUp(firstName, lastName, nickName, email, address, password);
  res.status(201).json({ message: 'userCreated' });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(201).json({ accessToken: token });
};

module.exports = {
  postSignUp,
  postLogin,
};
