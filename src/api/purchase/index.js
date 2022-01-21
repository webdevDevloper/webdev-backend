const router = require('express').Router()

const purchaseController = require('./purchase.controller')

router.post('/', purchaseController.addItem)
router.get('/', purchaseController.getItems)

module.exports = router
