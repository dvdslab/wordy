// get_new_post_form, publish_new_post, get_single_post, get_update_post_form, update_single_post,delete_single_post

const { Post } = require("../models/post");
const UserModel = require("../models/User");

const get_new_post_form = async (req, res) => {
  let login = false;
  let currentUser = {};
  if (req.session.user) {
    login = true;
    currentUser = await UserModel.findOne({
      username: req.session.user.username,
    });
  }

  res.render("new_post", { login, currentUser });
};

const publish_new_post = async (req, res) => {
  // save data to the database
  try {
    // req.body.author = req.session.user._id;
    const post = new Post(req.body);
    result = await post.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const get_single_post = async (req, res) => {
  let login = false;
  if (req.session.user) {
    login = true;
  }
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render("post", {
        post: result,
        login: login,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render("new_post");
};

const get_update_post_form = async (req, res) => {
  let login = false;
  let currentUser = {};
  if (req.session.user) {
    login = true;
    currentUser = await UserModel.findOne({
      username: req.session.user.username,
    });
  }
  const id = req.params.id;
  Post.findById(id)
    .then((posts) => {
      // CHECK IF AUTHOR IS CURRENT USER IN SESSION
      if (result.author != req.session.user._id) {
        // CHECK THIS INTO AN ERROR NOT A REDIRECT
        return res.redirect("/dashboard/" + req.session.user._id);
      }
      res.render("update_post", {
        posts,
        login,
        currentUser,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const update_single_post = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const delete_single_post = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        status: true,
        message: "Post deleted succefully",
        redirect: "/",
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: false,
        error: "Something went wrong",
        full_error: error,
      });
    });
};

module.exports = {
  get_new_post_form,
  publish_new_post,
  get_single_post,
  get_update_post_form,
  update_single_post,
  delete_single_post,
};
