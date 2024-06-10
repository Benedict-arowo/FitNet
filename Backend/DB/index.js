const { Sequelize, DataTypes } = require("sequelize");
const configFile = require("./config.json");
const userModel = require("../models/user.model");
const gymModel = require("../models/gym.model");
const waitlistModel = require("../models/waitlist.model");

const availableConfigs = ["development", "test", "production"];

if (!availableConfigs.includes(process.env.NODE_ENV.toString())) {
	throw new Error(
		"Invalid NODE_ENV provided. Must be one of the following. (development, test, production)"
	);
}

let connectionDetails = configFile[process.env.NODE_ENV];
const config = {
	host: connectionDetails.host,
	dialect: connectionDetails.dialect,
	port: connectionDetails.port || 3306,
	logging: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

const sequelize = new Sequelize(
	connectionDetails.database,
	connectionDetails.username,
	connectionDetails.password,
	config
);

const models = {
	User: userModel(sequelize, DataTypes),
	Gym: gymModel(sequelize, DataTypes),
	Waitlist: waitlistModel(sequelize, DataTypes),
};

module.exports = { sequelize, ...models };
