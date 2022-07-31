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
    const post = new Post(
      Object.assign(req.body, { author: req.session.user._id })
    );
    result = await post.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const get_single_post = async (req, res) => {
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
    .populate("author")
    .then((post) => {
      res.render("post", {
        post,
        login,
        currentUser,
      });
    })
    .catch((error) => {
      console.log(error);
    });
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
    .then((post) => {
      res.render("update_post", {
        post,
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

// commenting on a post
const comment_on_post = async (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((post) => {
      post.comments.push({
        comment: req.body.comment,
        author: req.session.user.username,
      });
      post.save();
      return res.redirect("/posts/read/" + id);
    })
    .catch((error) => {
      console.log(error);
    });
};

// like a post
const like_post = (req, res) => {
  const id = req.params.id;
  Post.findById(id).then((post) => {
    if (post.like.includes(req.session.user._id)) {
      return res.json({
        status: false,
        message: "already liked",
      });
    }
  });
  Post.findOneAndUpdate(
    { _id: id },
    { $push: { like: req.session.user._id } },
    { new: true }
  )
    .then((post) => {
      return res.json({
        status: true,
        message: "liked",
        count: post.like.length,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        status: false,
        message: "post not liked",
      });
    });
};

// unlike a post
const unlike_post = (req, res) => {
  const id = req.params.id;
  Post.findOneAndUpdate(
    { _id: id },
    { $pull: { like: req.session.user._id } },
    { new: true }
  )
    .then((post) => {
      return res.json({
        status: true,
        message: "unliked",
        count: post.like.length,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        status: false,
        error: "post not unliked",
        full_error: error,
      });
    });
};

// delete a post
const delete_single_post = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      return res.json({
        status: true,
        message: "Post deleted succefully",
        redirect: "/",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        status: false,
        error: "Something went wrong",
        full_error: error,
      });
    });
};

// 404page
const for04_page = (req, res) => {
  res.status(404).render("404");
};

module.exports = {
  get_new_post_form,
  publish_new_post,
  get_single_post,
  get_update_post_form,
  update_single_post,
  delete_single_post,
  comment_on_post,
  like_post,
  unlike_post,
  for04_page,
};
