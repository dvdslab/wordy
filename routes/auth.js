// const router = require("express").Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { registerValidation, loginValidation } = require("../validation");

// router.post("/register", async (req, res) => {
//   console.log(req.body);
//   // validating the data b4 we make a user
//   const { error } = registerValidation(req.body);
//   if (error)
//     return res.status(400).json({
//       status: false,
//       error: error.details[0].path[0].toUpperCase(),
//       message: error.details[0].message.toString(),
//     });
//   console.log(req.body);
//   // checking if the user is already on the DB
//   const emailExist = await User.findOne({
//     email: req.body.email.toLowerCase(),
//   });
//   if (emailExist)
//     return res.status(400).json({
//       status: false,
//       error: "EMAIL_DUPLICATE",
//       message: "That email is alredy in use",
//     });

//   // Hash paswords
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);

//   // Create a new user
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email.toLowerCase(),
//     password: hashedPassword,
//   });
//   try {
//     await user.save();
//     res.status(201).json({
//       status: true,
//       userId: user._id,
//       email: user.email,
//       name: user.name,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // login
// router.post("/login", async (req, res) => {
//   // validating the data b4 we make a user
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).json(error.details[0].message);

//   // checking if the email exists
//   const user = await User.findOne({ email: req.body.email.toLowerCase() });
//   if (!user) return res.status(400).json("Email is not found");

//   // checking if password is correct
//   const validPass = await bcrypt.compare(req.body.password, user.password);
//   if (!validPass) return res.status(400).json("invalid password");

//   // create and assign a token
//   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
//   res.header("auth-token", token).json(token);

//   res.json("Logged in!");
// });

// module.exports = { authRoute: router };
