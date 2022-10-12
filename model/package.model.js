module.exports = (sequelize, Sequelize) => {
  const Package = sequelize.define("package", {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    packageName: {
      type: Sequelize.STRING,
    },
    packageLocation: {
      type: Sequelize.STRING,
    },
    amountUnit: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    duration: {
      type: Sequelize.STRING,
    },
  });

  return Package;
};
