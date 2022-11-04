const express = require("express");
const { login, register, userData } = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");

// fetching ROuter method fro express
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/user", protectedRoute, userData);

module.exports = router;
