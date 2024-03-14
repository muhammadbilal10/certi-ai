const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('chat_app_o8ds', 'chat_app_o8ds_user', 'yQsjJDHeAcdvPocMWeMJcpfJqgnWJsPL', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
const sequelize = new Sequelize('postgres://chat_app_o8ds_user:yQsjJDHeAcdvPocMWeMJcpfJqgnWJsPL@dpg-cn7ir821hbls73drokp0-a.oregon-postgres.render.com/chat_app_o8ds', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS TO FIX YOUR ISSUE
    }
  }
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;