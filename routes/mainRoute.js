const express = require("express");
const { Post } = require("../models/post");
const mainRouter = express.Router();

// Homepage
mainRouter.get("/", (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      // console.log(result);
      res.render("home", { posts: result });
    })
    .catch((error) => {
      console.log(error);
    });
});
// About route
mainRouter.get("/about", (req, res) => {
  res.status(200).render("about");
});

mainRouter.get("/SignUp", (req, res) => {
  res.status(200).render("SignUp");
});

mainRouter.get("/SignIn", (req, res) => {
  res.status(200).render("SignIn");
});

mainRouter.get("/dashboard", (req, res) => {
  res.status(200).render("dashboard");
});

// 404 page
mainRouter.all("*", (req, res) => {
  res.status(404).render("404");
});

// exporting the main router

module.exports = { mainRouter };
