const Sequelize = require("sequelize");
const db = require("../db/db_config");
const passport = require('passport-local-mysql');


const UserModel = db.sequelize.define('User', {
  userName: {
    type: Sequelize.STRING, 
    allowNull: false, 
  }, 
  email: {
    type: Sequelize.STRING, 
    allowNull: false, 
    unique: true, 
  }, 
  password: {
    type: Sequelize.STRING, 
    allowNull: false
  }, 
  confirmPassword: {
    type: Sequelize.STRING,
    allowNull: false
  }

})



module.exports = UserModel;