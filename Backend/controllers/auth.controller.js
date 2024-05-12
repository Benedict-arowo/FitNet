const LoginUser = async (req, res) => {
	return res.json({ success: true, data: "LOGIN USER" });
};

const RegisterUser = async (req, res) => {
	return res.json({ success: true, data: "REGISTER USER" });
};

const LogoutUser = async (req, res) => {
	return res.json({ success: true, data: "LOGOUT USER" });
};

module.exports = {
	LoginUser,
	RegisterUser,
	LogoutUser,
};
