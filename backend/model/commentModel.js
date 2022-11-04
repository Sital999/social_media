module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    body: {
      type: Sequelize.STRING,
    },
  });
  return Comment;
};
