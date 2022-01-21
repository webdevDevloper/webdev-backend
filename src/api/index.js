const router = require('express').Router()

const purchase = require('./purchase')
const cart = require('./cart')

router.get('/purchase', purchase)
router.get('/cart', cart)

module.exports = router
