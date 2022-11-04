const asyncHandler = require("express-async-handler");
const { db } = require("../model");
const Comment = db.comment;
const User = db.user;
const Post = db.post;

// GET /api/comments/:id
// get comments
const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  // postId is id of post sent as params and postID is foreign key

  const comments = await Comment.findAll({ where: { postID: postId } });

  res.status(200).json({ comments });
});

// POST /api/comments/:id
// create comment
const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;
  //   getting user data
  const user = await User.findOne({ where: { id: req.userId } });
  //   getting post data
  const post = await Post.findOne({ where: { id: postId } });

  if (!body) {
    res.status(400);
    throw new Error("Please enter comment");
  }

  //   to check if user alreqady commented
  const commentExists = await Comment.findOne({
    where: { userID: req.userId, postID: postId },
  });
  if (commentExists) {
    res.status(400);
    throw new Error("User already commented");
  }

  //   creating comment
  const comment = await Comment.create({
    body,
    // postId is id of post sent as params and postID is foreign key
    postID: postId,
    userID: req.userId,
  });

  res.status(200).json({
    comment: `commented by ${user.name} and comment is :${comment.body} whereas title is : ${post.title}`,
  });
});

// DELETE /api/comments/:id
// delete comment
const deleteComment = asyncHandler(async (req, res) => {
  await Comment.destroy({
    truncate: true,
  });
});

module.exports = { createComment, getComments, deleteComment };
