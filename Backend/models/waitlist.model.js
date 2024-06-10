const { DataTypes } = require("sequelize");
const sequelize = require("../DB");

const Waitlist = sequelize.define(
	"waitlist",
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
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
