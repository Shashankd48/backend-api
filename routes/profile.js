const express = require("express");
const router = express.Router();
const { authenticate } = require("../controller/auth");
// @route    -  GET   /api/profile
// @desc    -   A route to user profile page
// @access  -   PRIVATE
// router.get("/profile", (req, res) => {});

router.get("/home", authenticate, (req, res) => {
   res.json({
      user: req.user,
      posts: {
         title: "Auth API",
         decription: "Learning Auth API with jsonwebtoken",
      },
   });
});
module.exports = router;
