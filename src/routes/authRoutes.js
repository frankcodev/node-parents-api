const router = require("express").Router();
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const { checkRegister } = require('../controllers/authMiddlewares')

router.post('/login', authController.login);
router.post('/register', 
    [
        check('email', 'Email required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password required').not().isEmpty(),
        check('cpassword', 'Confirm password required').not().isEmpty(),
        checkRegister
    ],
    authController.register
);

module.exports = router;