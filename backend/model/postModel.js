module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
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
