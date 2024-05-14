const { DataTypes } = require("sequelize");
const sequelize = require("../DB");

const Waitlist = sequelize.define(
	"waitlist",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isEmail: true,
			},
			unique: true,
		},
	},
	{
		freezeTableName: true,
		createdAt: true,
		updatedAt: false,
	}
);

module.exports = Waitlist;
