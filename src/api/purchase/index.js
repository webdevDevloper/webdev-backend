const router = require('express').Router();
// const protect = require('../../common/protect/protect').protect();
const purchaseController = require('./purchase.controller');

router.post('/', purchaseController.protect, purchaseController.addItem);
router.get('/', purchaseController.protect, purchaseController.getItems);
router.get('/get-total', purchaseController.protect, purchaseController.getTotal);

module.exports = router;
