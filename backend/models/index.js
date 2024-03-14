// models/index.js

const { Sequelize } = require('sequelize');
const UserModel = require('./user');

const sequelize = new Sequelize('postgres://chat_app_o8ds_user:yQsjJDHeAcdvPocMWeMJcpfJqgnWJsPL@dpg-cn7ir821hbls73drokp0-a.oregon-postgres.render.com/chat_app_o8ds', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

const User = UserModel(sequelize, Sequelize);

//sequelize.sync({ alter: true })  //every time the server starts, it will check if the tables are in the database, if not it will create them
 sequelize.sync()  
.then(() => {
    console.log('Database ready');
  });

module.exports = {
  User
};