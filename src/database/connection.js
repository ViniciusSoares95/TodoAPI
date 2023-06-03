require('dotenv').config();

//importa o sequelize
const Sequelize = require('sequelize');
//criar nova instancia de conexao com o mysql
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
      port: parseInt(process.env.MYSQL_PORT)   
    }
);

module.exports = sequelize;