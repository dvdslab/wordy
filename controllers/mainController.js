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
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    req.session.message = {
      type: "danger",
      intro: "Invalid credentials",
      message: "Please make sure to enter the correct credentials",
      sign: "exclamation-triangle-fill",
    };
    return res.redirect("/SignIn");
  } else {
    req.session.message = {
      type: "success",
      intro: "You are now logged in",
      message: "Welcome back",
      sign: "check-circle-fill",
    };
    req.session.user = {
      username: user.username,
      name: user.name,
      _id: user._id,
      email: user.email,
    };
    return res.redirect("/dashboard/" + user.username);
  }
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

  /* It's checking whether the user has filled all the fields, if not, it will return a message. */
  if (
    req.body.username == "" ||
    req.body.name == "" ||
    req.body.email == "" ||
    req.body.password == ""
  ) {
    req.session.message = {
      type: "danger",
      intro: "Enter fields",
      message: "Please fill all the fields",
      sign: "exclamation-triangle-fill",
    };
    return res.redirect("/SignUp");
  } else if (emailExist) {
    req.session.message = {
      type: "danger",
      intro: "Email already exists 😒",
      message: "Please enter a new email",
      sign: "exclamation-triangle-fill",
    };
    return res.redirect("/SignUp");
  } else if (req.body.password != req.body.confirm) {
    req.session.message = {
      type: "primary",
      intro: "Passwords do not match! ",
      message: "Please make sure to insert the same password.",
      sign: "info-fill",
    };
    return res.redirect("/SignUp");
  } else {
    req.session.message = {
      type: "success",
      intro: "You are now registered! ",
      message: "Please sign in to continue",
      sign: "check-circle-fill",
    };
    res.redirect("/SignUp");
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
  } catch (err) {
    res.status(500).json(err);
  }
};
// dashboard route
const dashboard_route = async (req, res) => {
  const currentUser = await UserModel.findOne({
    username: req.session.user.username,
  });
  req.session.message = {
    type: "success",
    intro: "You are now registered! ",
    message: "Please sign in to continue",
    sign: "check-circle-fill",
  };
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
