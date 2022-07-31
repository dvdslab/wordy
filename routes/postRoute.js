const express = require("express");
const { isAuth } = require("../middlewares/session");
// creating the router
const postRouter = express.Router();
const postController = require("../controllers/postController");

// get new_post_form, publish_new_post, get_single_post, get_update_post_form, update_single_post,delete_single_post

// new post
postRouter.get("/new_post", postController.get_new_post_form);

//  publish new post
postRouter.post("/new_post", isAuth, postController.publish_new_post);

// retrieve single post
postRouter.get("/read/:id", postController.get_single_post);

//updating a post
postRouter.get("/update_post/:id", isAuth, postController.get_update_post_form);

postRouter.post("/update_post/:id", isAuth, postController.update_single_post);

// comment on a post
postRouter.post("/comment/:id", isAuth, postController.comment_on_post);

// like a post
postRouter.post("/like/:id", isAuth, postController.like_post);

// unlike a post
postRouter.post("/unlike/:id", isAuth, postController.unlike_post);

// deleting a single post
postRouter.delete(
  "/delete_post/:id",
  isAuth,
  postController.delete_single_post
);
// 404 page
postRouter.all("*", postController.for04_page);
// exporting our postRouter
module.exports = { postRouter };
