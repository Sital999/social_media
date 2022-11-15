const express = require("express");
require("dotenv").config();
const ErrorHandler = require("./middleware/errorHandleMiddleware");

// for cross site request
const cors = require("cors");

const port = process.env.PORT_NUMBER || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connection to database
const { db } = require("./model");
db.sequelize
  .sync()
  .then(() => console.log("Successfully connected to database"));

// using routes on next page as middleware
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

// middleware for handling errors
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
