'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', { 
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
   }, 
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE
      
  });
     
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('users');
     
  }
};
