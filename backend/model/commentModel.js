module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    userName: { type: Sequelize.STRING, allowNull: false },
    body: {
      type: Sequelize.STRING,
    },
  });
  return Comment;
};
