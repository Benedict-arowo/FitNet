const { StatusCodes } = require("http-status-codes");
const ErrorWithStatusCode = require("../middlewear/ErrorWithStatusCode");
const Waitlist = require("../models/waitlist.model");

class WaitlistService {
	async createWaitlistEntry({ email, full_name }) {
		if (!email || !full_name) {
			throw new ErrorWithStatusCode(
				"Please provide an email and full name",
				StatusCodes.BAD_REQUEST
			);
		}

		try {
			return await Waitlist.create({ email, full_name });
		} catch (error) {
			if (error.original.code === "ER_DUP_ENTRY")
				throw new ErrorWithStatusCode(
					"Email already exists",
					StatusCodes.CONFLICT
				);
			throw new ErrorWithStatusCode(
				"Something went wrong",
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
	async getWaitlists() {
		return await Waitlist.findAll();
	}
}

module.exports = new WaitlistService();
