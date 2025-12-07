// Path: backend\Routes\AuthRouter.js
const router = require('express').Router();
const { signup, login, googleLogin } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// New route for Google Login (No middleware validation needed for the code itself)
router.post('/google', googleLogin);

module.exports = router;