const express = require("express");
const {
  getPosts,
  createPost,
  myPosts,
  deletePost,
  updatePost,
  searchPosts,
} = require("../controllers/postController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protectedRoute, getPosts)
  .post(protectedRoute, createPost);

// user's personal post

router.route("/user").get(protectedRoute, myPosts);

// delete posts
router
  .route("/:id")
  .put(protectedRoute, updatePost)
  .delete(protectedRoute, deletePost);

// search posts of other user
router.route("/search").get(protectedRoute, searchPosts);

module.exports = router;
