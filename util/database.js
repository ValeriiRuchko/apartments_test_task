const { Sequelize } = require('sequelize');

const db = new Sequelize('apartments_db', 'postgres', 'temporarypass', {
    host: 'localhost',
    dialect: 'postgres'
});

// checking if connection to db is successful
const checkConnection = async () => {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  
checkConnection();

module.exports = db;