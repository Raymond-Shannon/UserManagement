const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.connection = sequelize;

db.users = require('./user')(db.connection, db.Sequelize)
db.role = require("./role")(db.connection, db.Sequelize);
db.permission = require("./permission")(db.connection, db.Sequelize);

db.permission.belongsToMany(db.role, {through: "role_permission"});
db.role.belongsToMany(db.permission, {through: "role_permission"});
db.role.hasMany(db.users);
db.users.belongsTo(db.role);

module.exports = db;