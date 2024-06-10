const axios = require("axios");
const { Gym } = require("../DB");

const searchParams = {
	key: process.env.API_KEY,
	location: process.env.DEFAULT_LOCATION, // Latitude and longitude of Lagos, Nigeria
	radius: 5000, // Search radius in meters (adjust as needed)
	keyword: "gym",
};

// Function to validate gym data
const validateGymData = (gymData) => {
	if (
		!gymData.name ||
		!gymData.address ||
		!gymData.latitude ||
		!gymData.longitude
	) {
		return false;
	}
	return true;
};

// Function to upsert gyms into the database
const upsertGyms = async (gyms) => {
	try {
		const promises = gyms.map(async (gym) => {
			// Check if gym already exists in the database using apiId
			const existingGym = await Gym.findOne({
				where: { apiId: gym.apiId },
			});
			if (existingGym) {
				// Update existing gym
				await existingGym.update(gym);
				return `Gym updated: ${gym.name}`;
			} else {
				// Create new gym

				await Gym.create(gym);
				return `Gym created: ${gym.name}`;
			}
		});

		const results = await Promise.all(promises);
		results.forEach((result) => console.log(result));
	} catch (error) {
		console.error("Error upserting gyms:", error);
	}
};

/**
 * Fetches gyms from the Google Places API and processes the data.
 * @returns {Promise<void>} A promise that resolves when the gyms have been fetched and processed.
 */
const main = async () => {
	// Make request to Google Places API to search for gyms
	return axios
		.get(process.env.API_URL, { params: searchParams })
		.then(async (response) => {
			const gyms = response.data.results.map(async (gymData) => {
				// Make additional request to get details for each place
				const placeDetailsUrl =
					"https://maps.googleapis.com/maps/api/place/details/json";
				const placeDetailsParams = {
					key: process.env.API_KEY,
					place_id: gymData.place_id,
				};

				try {
					const placeDetailsResponse = await axios.get(
						placeDetailsUrl,
						{
							params: placeDetailsParams,
						}
					);
					const placeDetails = placeDetailsResponse.data.result;

					// Extract relevant data from placeDetails to populate additional fields
					const price = placeDetails.price_level; // Example: Price level (1, 2, 3, 4, or null if not available)
					const services = placeDetails.types.join(", "); // Example: Types of services offered by the gym
					const trainers_available = null; // Example: Logic to determine availability of trainers

					return {
						name: gymData.name,
						address: gymData.vicinity,
						latitude: gymData.geometry.location.lat,
						longitude: gymData.geometry.location.lng,
						price: price,
						services: services,
						trainers_available: trainers_available,
						apiId: gymData.place_id,
					};
				} catch (error) {
					console.error(
						`Error fetching details for place ${gymData.place_id}:`,
						error
					);
					return null;
				}
			});

			// Wait for all async operations to complete
			const gymsWithData = await Promise.all(gyms);

			// Filter out gyms with missing data
			const validGyms = gymsWithData.filter(
				(gym) => gym !== null && validateGymData(gym)
			);

			if (validGyms.length > 0) {
				await upsertGyms(validGyms);
			} else {
				console.log("No valid gyms found in the API response");
			}
		})
		.catch((error) => {
			console.error("Error fetching gyms from Google Places API:", error);
		});
};

module.exports = main;
