const { Sequelize } = require("sequelize");

if (!process.env.CONNECTION_STRING)
	throw new Error("CONNECTION_STRING is required in .env file");
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {});

module.exports = sequelize;
