const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const categoriesRouter = require('./categoriesRouter');
const orderRouter = require('./orderRouter');
const cartRouter = require('./cartRouter');

router.use('/categories/:categoryId', categoriesRouter);

router.use('/users', userRouter);

router.use('/products', productRouter);

router.use('/orders', orderRouter);

router.use('/cart', cartRouter);

module.exports = router;
