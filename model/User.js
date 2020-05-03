const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: [3, "Name too short"],
      maxlength: [255, "Name too large"],
   },
   email: {
      type: String,
      required: true,
      maxlength: [255, "Email too large"],
   },
   password: {
      type: String,
      required: true,
      maxlength: 1024,
      minlength: [6, "Password must contain 6 character"],
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("User", userSchema);
