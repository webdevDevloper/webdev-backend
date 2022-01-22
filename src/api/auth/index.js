// route endpoint /auth
const authController = require('./auth.controller');
const router = require('express').Router();
const { validate } = require('../../middleware/validate');
// const { userPermission } = require('../../common/userPermission');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.route('/updateMyPassword').patch(validate, authController.updatePassword);

module.exports = router;
