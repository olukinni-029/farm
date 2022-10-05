module.exports = (sequelize, Sequelize) => {
const Investment = sequelize.define("investment",{
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true, 
        primaryKey: true,
      },
      packageId:{
         type: Sequelize.INTEGER,
      },
      userId:{
        type: Sequelize.INTEGER,
      },
      quantity:{
        type: Sequelize.INTEGER,
      }
})
 return Investment;
};