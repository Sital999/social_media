module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
    },
  });
  return Post;
};
