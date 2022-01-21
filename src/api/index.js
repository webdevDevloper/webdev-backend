const router = require('express').Router()

const purchase = require('./purchase')
const cart = require('./cart')
const items = require('./items')
const auth = require('./auth')

router.use('/items', items)
router.use('/auth', auth)
router.use('/purchase', purchase)
router.use('/cart', cart)

module.exports = router
