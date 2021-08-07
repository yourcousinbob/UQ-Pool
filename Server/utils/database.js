/* Setup up ORM Sequelize which connects the server to the database*/

/* JS libraries to import */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('loginDB', 'root', 'Password1!', {
    dialect: 'mysql',
    host: 'localhost',
});

export default sequelize;
