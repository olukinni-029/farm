module.exports = (sequelize, Sequelize) => {
  const Investment = sequelize.define("investment", {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.DECIMAL,
      allowNull: true,
      defaultValue: 0.0,
    },
    totalAmount: {
      type: Sequelize.INTEGER,
    },
  });
  return Investment;
};
