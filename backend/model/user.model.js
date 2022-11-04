module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );
  return User;
};
