const router = require('express').Router()

const cartController = require('./purchase.controller')

router.get('/', cartController.getItems)
router.post('/update', cartController.updateItem)
router.get('/add', cartController.addItem)

module.exports = router
