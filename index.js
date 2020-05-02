require("dotenv").config();
const express = require("express");
const app = express();
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
const authRoute = require("./routes/Auth");

// Route middleware
app.use("/api/user", authRoute);

app.listen(port, () =>
   console.log(`Server is running on localhost at port ${port}`)
);
