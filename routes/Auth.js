const router = require("express").Router();
const { register, isEmailExist, login } = require("../controller/auth");

// @route    -  POST   /api/register
// @desc    -   A route to register page
// @access  -   PUBLIC
router.post("/register", isEmailExist, register);

// @route    -  POST   /api/login
// @desc    -   A route to login page
// @access  -   PUBLIC
router.post("/login", login);

module.exports = router;
