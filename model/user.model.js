module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        unique:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      googleId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        enumerable: ["user", "admin"],
        defaultValue: "user",
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return User;
};
