//requiring sequelize and utility file
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//defining user schema
const User = sequelize.define('users', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    student_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
    course: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    blood_group: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    hosteller: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    contact_no: {
        type: Sequelize.STRING,
        allowNull: false,
      }

})

module.exports = User;