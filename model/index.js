// const dbConfig = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   logging: false,
//   // declaring pool is optional
//   //  pool: {
//   //  max: dbConfig.pool.max,
//   //  min: dbConfig.pool.min,
//   //  acquire: dbConfig.pool.acquire,
//   //  idle: dbConfig.pool.idle
//   //  }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.user = require("./user.model.js")(sequelize, Sequelize);
// db.package = require("./package.model.js")(sequelize, Sequelize);
// db.investment = require("./investment.model.js")(sequelize, Sequelize);


// module.exports = db;
const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  // declaring pool is optional
  //  pool: {
  //  max: dbConfig.pool.max,
  //  min: dbConfig.pool.min,
  //  acquire: dbConfig.pool.acquire,
  //  idle: dbConfig.pool.idle
  //  }
});
const db = {};


// associate investment with package
db.investment = require('./investment.model.js')(sequelize, Sequelize); 
db.package = require('./package.model.js')(sequelize, Sequelize);
db.investment.belongsTo(db.package, { // belongs to package means investment has a packageId
  foreignKey: 'packageId', // packageId is the foreign key
  as: 'package',
});

// associate investment with user
db.user = require('./user.model.js')(sequelize, Sequelize);
db.investment.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user',
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;