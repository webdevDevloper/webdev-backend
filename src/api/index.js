const router = require('express').Router()

const purchase = require('./purchase')

router.get('/purchase', purchase)

module.exports = router
