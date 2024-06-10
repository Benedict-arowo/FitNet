// jobs/updateGyms.js
const cron = require("node-cron");
const fetchAndUpdateGyms = require("../scripts/fetchGyms"); // Adjust path as necessary
// const db = require("../models"); // Import the database models

// Schedule the job to run every day at midnight
cron.schedule("0 0 * * *", async () => {
	console.log("Running the gym update job...");

	try {
		await fetchAndUpdateGyms();
		console.log("Gym data updated successfully");
	} catch (error) {
		console.error("Error updating gym data:", error);
	}
});

console.log("Cron Job is up and running!!!");
