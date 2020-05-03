require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const key = require("./setup/config");
// connect to DB
mongoose
   .connect(key.url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
   })
   .then(() => console.log("DB CONNECT SUCCESSFULLY!"))
   .catch("FAILED TO CONNECT TO DB");

// import routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

// Route middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/user", authRoute);
app.use("/api/profile", profileRoute);

app.listen(port, () =>
   console.log(`Server is running on localhost at port ${port}`)
);
