const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'oracle',
  dialectOptions: {
    connectString: 'localhost:1521/ora19',
  },
  username: 'minertecnologia',
  password: 'minertecnologia',
});

module.exports = sequelize;
