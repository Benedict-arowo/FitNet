require("dotenv").config({ path: "../.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ErrorHandler = require("./middlewear/ErrorHandler");
const ApplyRoutes = require("./Routes");
const sequelize = require("./DB");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || `http://localhost:${PORT}`,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
ApplyRoutes(app);

// Error Handler
app.use(ErrorHandler);
app.listen(PORT, async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		// if (process.env.NODE_ENV === "development") {
		// 	await sequelize.sync({ force: true });
		// 	console.log("All models were synchronized successfully.");
		// }
		console.log("listening on port " + PORT);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
});
