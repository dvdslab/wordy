// homepage route, About route, Signin route, validating users, signUp route, dashboard route, LogOut, 404 Page.

const { Post } = require("../models/post");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");

// homepage route
const homepage_route = async (req, res) => {
  let login = false;
  let currentUser = {};
  if (req.session.user) {
    login = true;
    currentUser = await UserModel.findOne({
      username: req.session.user.username,
    });
  }

  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render("home", {
        posts,
        login,
        currentUser,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//  About route
const about_route = async (req, res) => {
  let login = false;
  let currentUser = {};
  if (req.session.user) {
    login = true;
    currentUser = await UserModel.findOne({
      username: req.session.user.username,
    });
  }

  return res.status(200).render("about", { login, currentUser });
};

// Signin route
const signin_route = async (req, res) => {
  let login = false;
  let currentUser = {};
  if (req.session.user) {
    login = true;
    currentUser = await UserModel.findOne({
      username: req.session.user.username,
    });
  }
  return res.status(200).render("SignIn", { login, currentUser });
};

// validating users

const validating_users = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.redirect("/SignIn");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.redirect("/SignIn");
  }
  req.session.user = {
    username: user.username,
    name: user.name,
    _id: user._id,
    email: user.email,
  };
  return res.redirect("/dashboard/" + user.username);
};

// signUp route
const signup_route = (req, res) => {
  let login = false;
  if (req.session.user) {
    login = true;
  }
  res.status(200).render("SignUp", { login });
};

// SigningUp
const SigningUp = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await UserModel.findOne({ email });

  if (emailExist) {
    res.redirect("/SignUp").status(400).json({
      status: false,
      error: "EMAIL_DUPLICATE",
      message: "That email is alredy in use",
    });
  }

  // Hash paswords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new UserModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.redirect("/SignIn");
  } catch (err) {
    res.status(500).json(err);
  }
};
// dashboard route
const dashboard_route = async (req, res) => {
  const currentUser = await UserModel.findOne({
    username: req.session.user.username,
  });
  // CHECK WhETHER USER EXIT(I don't think thiis is nessecary, 'cause of i've done it in the SignUp endpoint)
  //
  const author = req.session.user._id;
  omo = author.toString().replace(/ObjectId\("(.*)"\)/, "$1");
  Post.find({ author: omo })
    .populate("author")
    .sort({ createdAt: -1 })
    .then((posts) => {
      return res.status(200).render("dashboard", {
        currentUser,
        posts,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// LogOut
const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

// 404page
const for04_page = (req, res) => {
  res.status(404).render("404");
};

module.exports = {
  homepage_route,
  about_route,
  signin_route,
  validating_users,
  signup_route,
  SigningUp,
  dashboard_route,
  Logout,
  for04_page,
};
