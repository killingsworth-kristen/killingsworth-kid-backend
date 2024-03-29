
require('dotenv').config();

const Sequelize = require('sequelize');
console.log("Pre-Connection")
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: `/cloudsql/${process.env.SQL_INSTANCE}`,
  timestamps: false,
  dialectOptions: {
    socketPath: `/cloudsql/${process.env.SQL_INSTANCE}`
},
});

console.log("Post-connection")

module.exports = sequelize;