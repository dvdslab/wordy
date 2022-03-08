const express = require("express");
const mongoose = require("mongoose");
const { postRouter } = require("./routes/postRoute");
const { mainRouter } = require("./routes/mainRoute");
const { authRoute } = require("./routes/auth");
const dotenv = require("dotenv");
// const { postRoute } = require("./routes/posts");

dotenv.config();

const wordy = express();

// setting the app defaults
wordy.set("view engine", "ejs");

require("cors")();

// setting up middlewares
wordy.use(express.static("./public"));
wordy.use(express.urlencoded({ extended: true }));

// Middleware
wordy.use(express.json());

// connecting to the database
const dbURI = process.env.DB_CONNECT;
const PORT = process.env.PORT;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    wordy.listen(PORT, () => {
      console.log(`App is listening in http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// app.get("/SignUp", (req, res) => {
//   res.status(200).render("SignUp");
// });

// everything relating to home, about, 404

// Everything relating to CRUD operation
wordy.use("/posts", postRouter);

// route middleware
wordy.use("/api/user", authRoute);
// wordy.use("/api/posts", postRoute);

wordy.use(mainRouter);
