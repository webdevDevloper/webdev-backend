const router = require('express').Router();

//const auth = require('./auth')
const items = require('./items');

//router.use('/auth', auth)
router.use('/items', items);

module.exports = router;