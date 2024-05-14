const { StatusCodes } = require("http-status-codes");
const Waitlist = require("../models/waitlist.model");
const waitlistService = require("../services/waitlist.service");

const createWaitlist = async (req, res) => {
	const { full_name, email } = req.body;
	const waitlist = await waitlistService.createWaitlistEntry({
		email,
		full_name,
	});
	return res
		.status(StatusCodes.CREATED)
		.json({ success: true, data: waitlist });
};

const getWaitlist = async (req, res) => {
	const waitlists = await waitlistService.getWaitlists();
	return res.status(StatusCodes.OK).json({ success: true, data: waitlists });
};

module.exports = {
	createWaitlist,
	getWaitlist,
};
