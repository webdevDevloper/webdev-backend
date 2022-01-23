const router = require('express').Router();
const { validate } = require('../../middleware/validate');

const cartController = require('./cart.controller');

router.route('/').get(validate, cartController.getItems);
router.route('/update').post(validate, cartController.updateItem);
router.route('/add').post(validate, cartController.addItem);
router.route('/get-total').get(validate, cartController.getTotal);

module.exports = router;
