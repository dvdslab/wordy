// get_new_post_form, publish_new_post, get_single_post, get_update_post_form, update_single_post,delete_single_post

const { Post } = require("../models/post");

const get_new_post_form = (req, res) => {
  res.render("new_post");
};

const publish_new_post = async (req, res) => {
  // save data to the database
  try {
    const post = new Post(req.body);
    result = await post.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const get_single_post = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render("post", { post: result });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render("new_post");
};

const get_update_post_form = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render("update_post", { post: result });
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
