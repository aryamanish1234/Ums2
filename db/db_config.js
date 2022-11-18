const Sequelize = require('sequelize');
console.log(process.env.HOST)
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    pool: {
        max: 5,

        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;















// dbConfig = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "root",
//     DB: "userdata",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }