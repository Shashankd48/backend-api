const { registerValidation, loginValidation } = require("../setup/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../model/User");

// Register user
exports.register = async (req, res) => {
   // hash passowrd here
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });
   await user.save((err, user) => {
      if (err) {
         res.status(400).json({
            error: err.message,
         });
      } else {
         res.status(200).json({
            user: {
               id: user._id,
               name: user.name,
               email: user.email,
            },
            message: "User Added Successfully!",
         });
      }
   });
};

// login User
exports.login = async (req, res) => {
   const { email, password } = req.body;
   const { error } = loginValidation(req.body);
   if (error) {
      return res.status(400).json({ error: error.details[0].message });
   }
   User.findOne({ email: email }, async (err, user) => {
      if (err || !user) {
         return res.status(400).json({
            error: "Account does not exist",
         });
      } else {
         // Compare hashed password
         const validPass = await bcrypt.compare(password, user.password);
         if (!validPass) {
            return res.status(400).json({
               message: "Invalid Password",
            });
         } else {
            //Create and asign a token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.header("auth-token", token).json({
               token: token,
               message: "LoggedIn Successfully!",
            });
         }
      }
   });
};

// Middleware: Varify if User already exists
exports.isEmailExist = (req, res, next) => {
   const { error } = registerValidation(req.body);
   if (error) {
      return res.status(400).json({ error: error.details[0].message });
   }
   User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
         return res.status(400).json({
            message: "Unable to varify user!",
         });
      }
      if (user) {
         return res.status(400).json({ message: "Email already exist" });
      } else {
         next();
      }
   });
};

exports.authenticate = (req, res, next) => {
   const token = req.header("auth-token");
   if (!token)
      return res.status(400).json({
         error: "Access Denied",
      });

   try {
      const varified = jwt.verify(token, process.env.SECRET);
      req.user = varified;
      next();
   } catch (err) {
      res.status(400).json({
         error: "Invalid Token",
      });
   }
};
