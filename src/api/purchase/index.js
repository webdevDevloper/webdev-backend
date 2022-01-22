const router = require('express').Router();
const { validate } = require('../../middleware/validate/validate');
const purchaseController = require('./purchase.controller');

router.route('/').post(validate, purchaseController.addItem);
router.route('/').get(validate, purchaseController.getItems);
router.route('/get-total').get(validate, purchaseController.getTotal);

module.exports = router;
