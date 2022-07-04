const express = require("express");
const mongoose = require("mongoose");
const { postRouter } = require("./routes/postRoute");
const { mainRouter } = require("./routes/mainRoute");
const { newSession } = require("./middlewares/session");
const flash = require("connect-flash");
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
wordy.use(newSession);
wordy.use(flash());
wordy.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
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

// Everything relating to CRUD operation
wordy.use("/posts", postRouter);

// route middleware
// wordy.use("/api/user", authRoute);
// wordy.use("/api/posts", postRoute);

wordy.use(mainRouter);
