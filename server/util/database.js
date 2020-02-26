//requiring sequelize
const Sequelize = require('sequelize');

//utility database file for all models
const sequelize = new Sequelize('node_bdc', 'root', 'sequel568', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
