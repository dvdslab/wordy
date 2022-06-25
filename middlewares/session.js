const session = require("express-session");
const MongoDBSesson = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");

dotenv.config();

const dbURI = process.env.DB_CONNECT;

// middleware
const store = new MongoDBSesson({
  uri: dbURI,
  collection: "mySessions",
});

const newSession = session({
  secret: "key that will sign cookie",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 24 * 60 * 60,
  },
});

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.redirect("/SignIn");
  }
};

module.exports = {
  newSession,
  isAuth,
};
