const { Router } = require("express");
const { isAuth } = require("../middlewares/session");
const mainController = require("../controllers/mainController");
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
mainRouter.get("/dashboard/:id", isAuth, mainController.dashboard_route);
// logout post request
mainRouter.post("/logOut", mainController.Logout);

// 404 page
mainRouter.all("*", mainController.for04_page);

// exporting the main router

module.exports = { mainRouter };
