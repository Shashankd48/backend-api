const User = require("../model/User");

exports.getUserById = (req, res, userId) => {
   User.findById(userId).exec((err, user) => {
      if (err) {
         res.status(400).json({
            error: "User not found!",
         });
      } else {
         const { name, email } = userId;
         res.json({
            user: { userId, name, email },
         });
      }
   });
};
