const itemsController = require('./items.controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    !req.query.name ? itemsController.getAllItems(req, res) : itemsController.getItemsByName(req, res)
})

router.get('/:id', itemsController.getItemDetail)

router.post('/', itemsController.uploadItem)

module.exports = router
