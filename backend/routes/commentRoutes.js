const express = require("express");
const { protectedRoute } = require("../middleware/authMiddleware");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router
  .route("/:postId")
  .get(protectedRoute, getComments)

  .post(protectedRoute, createComment);

router.route("/").delete(protectedRoute, deleteComment);
module.exports = router;
