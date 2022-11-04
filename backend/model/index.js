const Sequelize = require("sequelize");

const sequelize = new Sequelize("social_media", "social", "media", {
  host: "localhost",
  //   type of database
  dialect: "sqlite",
  //   creates the database
  storage: "./social_media.sqlite",
});

// making db object so it cn be easily accessed
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.post = require("./postModel")(sequelize, Sequelize);
db.comment = require("./commentModel")(sequelize, Sequelize);

// relationships
// for user and post
db.user.hasMany(db.post, { foreignKey: "userID", as: "posts" });
// only use hasMany or belongsTo otherwise foreign key is created twice
// db.post.belongsTo(db.user, { as: "user" });

// after this id is formed as foreignKey with model name and "ID" i.e."post"+"ID"
// for commenr and post
db.comment.belongsTo(db.post, { foreignKey: "postID", as: "post" });

// for comment and user
db.user.hasOne(db.comment, { foreignKey: "userID", as: "user" });

module.exports = { db };
