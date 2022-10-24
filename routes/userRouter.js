const express = require('express');
const { postSignUp, postLogin } = require('../controllers/userController');
const { postSignUpValidate, postLoginValidate } = require('../middlewares/validator/userValidator');
const { validator } = require('../middlewares');
const { catchAsync } = require('../middlewares/ErrorHandler');

const router = express.Router();

router.post('/signup', validator(postSignUpValidate), catchAsync(postSignUp));

router.post('/login', validator(postLoginValidate), catchAsync(postLogin));

module.exports = router;
