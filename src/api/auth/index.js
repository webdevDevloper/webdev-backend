// route endpoint /auth
const authController = require('./auth.controller');
const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

module.exports = router;
