module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
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
};
