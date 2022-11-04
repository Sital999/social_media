const asyncHandler = require("express-async-handler");
const { db } = require("../model");
const Post = db.post;
const User = db.user;

//  GET /api/posts
// Get Posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({});
  if (!posts) {
    res.status(200).json({ msg: "No posts found" });
  }
  res.status(200).json({ posts });
});

// POST /api/posts
// create Post
const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Please enter a title");
  }
  const post = await Post.create({
    title,
    body,
    userID: req.userId,
  });
  if (!post) {
    res.status(400);
    throw new Error("Please enter a post");
  }
  res.status(201).json({ post });
});

// GET /api/posts/user
// get user's own posts
const myPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({ where: { UserID: req.userId } });
  if (!posts) {
    res.status(200).json({ msg: "No posts found" });
  }
  res.status(200).json({ posts });
});

// DELETE /api/posts/:id
// delete posts
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const postId = id;
  const post = await Post.findOne({ where: { id: postId } });
  if (post.UserId === req.userId) {
    await Post.destroy({ where: { id } });
    res.status(204).json({ msg: "Post deleted successfully" });
  }
  res.status(401).json({ msg: "Not authorized" });
});

// UPDATE /api/posts/:id
// update posts
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const postId = id;
  const post = await Post.findOne({ where: { id: postId } });
  // check if valid user is updating
  if (post.UserId === req.userId) {
    // updates the fields but not on database
    post.set(req.body);
    // this updates on database
    await post.save();
    res.status(201).json({ msg: "Updated post successfully" });
  }
  res.status(401).json({ msg: "Not authorized" });
});

// GET /api/posts/?query
// search posts of user with username
const searchPosts = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const userExists = await User.findOne({ where: { name } });
  if (!userExists) {
    res.status(400);
    throw new Error("User not found");
  }
  const posts = await Post.findAll({ where: { userID: userExists.id } });
  res.status(200).json({ posts });
});

module.exports = {
  createPost,
  getPosts,
  myPosts,
  deletePost,
  updatePost,
  searchPosts,
};
