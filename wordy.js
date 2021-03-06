const express = require("express");
const mongoose = require("mongoose");
const { postRouter } = require("./routes/postRoute");
const { mainRouter } = require("./routes/mainRoute");
const { newSession } = require("./middlewares/session");
const flash = require("connect-flash");
const dotenv = require("dotenv");

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
const PORT = process.env.PORT || 5000;

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

wordy.use(mainRouter);

wordy.all("*", (req, res) => {
  res.status(404).render("404");
});
