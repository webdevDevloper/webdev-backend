const router = require('express').Router();

const purchase = require('./purchase');
// const items = require('./items');
// const cart = require('./cart');
// const auth = require('./auth');

router.use('/purchase', purchase);
// router.use('/items', items)
// router.use('/auth', auth);
// router.use('/cart', cart);

module.exports = router;
