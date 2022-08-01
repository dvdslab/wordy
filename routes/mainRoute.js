const { Router } = require("express");
const { isAuth } = require("../middlewares/session");
const mainController = require("../controllers/mainController");
const upload = require("../utils/multer");
const mainRouter = Router();

// Homepage
mainRouter.get("/", mainController.homepage_route);
// About route
mainRouter.get("/about", mainController.about_route);
// SignIn route
mainRouter.get("/SignIn", mainController.signin_route);
// VALIDATING USERS IN THE SIGNIN PAGE
mainRouter.post("/SignIn", mainController.validating_users);
// SIGNUP ROUTE
mainRouter.get("/SignUp", mainController.signup_route);
// SigningUp
mainRouter.post("/SignUp", mainController.SigningUp);
// mainRouter.post("/SignUp", (req, res) => {});

// DASHBOARD ROUTE
mainRouter.get("/dashboard/:username", isAuth, mainController.dashboard_route);

// update profile route
mainRouter.post(
  "/edit/:username",
  isAuth,
  upload.single("image"),
  mainController.update_profile_route
);

// upload profile photo route
mainRouter.post(
  "/upload/:username",
  isAuth,
  upload.single("image"),
  mainController.upload_profile_photo_route
);

// delete profile photo route
mainRouter.delete(
  "/upload/:username",
  isAuth,
  mainController.delete_profile_photo_route
);

// logout post request
mainRouter.post("/logOut", mainController.Logout);

// 404 page
mainRouter.all("*", mainController.for04_page);

// exporting the main router

module.exports = { mainRouter };
