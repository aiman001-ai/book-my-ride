// Path: backend\Routes\AuthRouter.js
const router = require('express').Router();
const { signup, login, googleLogin } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// NORMAL SIGNUP
router.post('/signup', signupValidation, signup);

// NORMAL LOGIN
router.post('/login', loginValidation, login);

// GOOGLE LOGIN (using AuthController googleLogin)
router.post('/google', googleLogin);

module.exports = router;
