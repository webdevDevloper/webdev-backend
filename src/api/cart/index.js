const router = require('express').Router();

const cartController = require('./cart.controller');

router.get('/', cartController.getItems);
router.post('/update', cartController.updateItem);
router.post('/add', cartController.addItem);
router.get('/total', cartController.getTotal);

module.exports = router;
