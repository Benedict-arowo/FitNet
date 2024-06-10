"use strict";

module.exports = (sequelize, DataTypes) => {
	const Gym = sequelize.define(
		"Gym",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			latitude: {
				type: DataTypes.DECIMAL(10, 8),
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			longitude: {
				type: DataTypes.DECIMAL(11, 8),
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			services: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			trainers_available: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			apiId: {
				// This field will store the API ID for easy updates
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
		},
		{}
	);

	Gym.associate = function (models) {
		Gym.hasMany(models.GymMembership, { foreignKey: "gymId" });
	};

	// Add a method to update gyms from an external API
	Gym.updateGymsFromAPI = async function (apiData) {
		for (const gymData of apiData) {
			await Gym.upsert({
				apiId: gymData.id,
				name: gymData.name,
				address: gymData.address,
				latitude: gymData.latitude,
				longitude: gymData.longitude,
				price: gymData.price,
				services: gymData.services,
				trainers_available: gymData.trainers_available,
				updatedAt: new Date(),
			});
		}
	};

	return Gym;
};
