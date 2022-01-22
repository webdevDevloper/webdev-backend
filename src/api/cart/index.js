const router = require('express').Router();
// const protect = require('../../common/protect/protect').protect();
const cartController = require('./cart.controller');

router.get('/', cartController.getItems);
router.post('/update', cartController.updateItem);
router.post('/add', cartController.addItem);
router.get('/get-total', cartController.getTotal);

module.exports = router;
