const Sequelize = require('sequelize');

// Init Sqlite DB connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

// Create Table
const Inventory = require('../models/Inventory')(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, Inventory };
