const express = require("express");
const { Post } = require("../models/post");
// creating the router
const postRouter = express.Router();
const postController = require("../controllers/postController");

// get new_post_form, publish_new_post, get_single_post, get_update_post_form, update_single_post,delete_single_post

// new post
postRouter.get("/new_post", postController.get_new_post_form);

//  publish new post
postRouter.post("/new_post", postController.publish_new_post);

// retrieve single post
postRouter.get("/read/:id", postController.get_single_post);

//updating a post
postRouter.get("/update_post/:id", postController.get_update_post_form);

postRouter.post("/update_post/:id", postController.update_single_post);

// deleting a single post
postRouter.delete("/delete_post/:id", postController.delete_single_post);

// exporting our postRouter
module.exports = { postRouter };
